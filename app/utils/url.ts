const bases = {
  api: process.env.API_URL ?? 'https://api.facegov.org',
  webapp: process.env.APP_URL ?? 'https://facegov.org',
  media: process.env.MEDIA_URL ?? 'https://media.facegov.org',
};

const url = (path: string, base: 'api' | 'webapp' | 'media'): string => {
  const baseUrl = bases[base];
  const urlObject = new URL(path, baseUrl);
  return urlObject.toString();
};

export default url;
