export async function shareUrl(url: string) {
  if ('canShare' in navigator && navigator.canShare({ url })) {
    return navigator.share({ url }).then(() => 'shared' as const);
  }

  return navigator.clipboard.writeText(url).then(() => 'copied' as const);
}
