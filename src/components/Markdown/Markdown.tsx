import MarkdownComponent from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { remarkCustomSpoiler } from '../../utils/remarkCustomSpoiler';
import { Spoiler } from '../Spoiler/Spoiler';
import styles from './Markdown.module.css';

export function Markdown({ children }: { children: string | undefined | null }) {
  return (
    <div className={styles.markdown}>
      <MarkdownComponent
        components={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          spoiler: Spoiler,
          /* img: Image, */
        }}
        remarkPlugins={[remarkGfm, remarkCustomSpoiler]}
      >
        {children}
      </MarkdownComponent>
    </div>
  );
}

/* function Image(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img className="w-2.5" alt="" {...props} />;
} */
