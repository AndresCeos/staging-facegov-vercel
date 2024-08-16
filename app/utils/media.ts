export default function getMediaUrl(path: string) {
  const mediaUrl = process.env.MEDIA_URL ?? '';

  const url = new URL(`media/${path}`, mediaUrl);

  return url.href;
}
