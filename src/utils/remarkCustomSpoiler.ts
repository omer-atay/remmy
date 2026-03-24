import { visit } from 'unist-util-visit';
import type { Node, Parent } from 'unist';
import type { Paragraph, Text } from 'mdast';

type SpoilerNode = Node & {
  type: 'spoiler';
  data?: {
    hName?: string;
    hProperties?: {
      title: string;
    };
  };
  children: Node[];
};

export function remarkCustomSpoiler() {
  return (tree: Node) => {
    visit(tree, (node: Node, index?: number, parent?: Parent) => {
      if (!parent || typeof index !== 'number') return;

      // Only process paragraphs
      if (node.type !== 'paragraph') return;

      const paragraph = node as Paragraph;

      const firstChild = paragraph.children[0] as Text | undefined;
      const text = firstChild?.value ?? '';

      if (!text.startsWith('::: spoiler')) return;

      const title = text.replace('::: spoiler', '').trim();

      const newNode: SpoilerNode = {
        type: 'spoiler',
        data: {
          hName: 'spoiler',
          hProperties: {
            title,
          },
        },
        children: [],
      };

      let i = index + 1;

      // Collect nodes until closing :::
      while (i < parent.children.length) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const next = parent.children[i]!;

        if (
          next.type === 'paragraph' &&
          (next as Paragraph).children[0]?.type === 'text' &&
          ((next as Paragraph).children[0] as Text).value.trim() === ':::'
        ) {
          break;
        }

        newNode.children.push(next);
        i++;
      }

      // Replace the matched nodes (start → closing :::)
      parent.children.splice(index, i - index + 1, newNode);
    });
  };
}
