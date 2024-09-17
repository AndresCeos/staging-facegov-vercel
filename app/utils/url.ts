const bases = {
  api: process.env.API_URL ?? 'https://api.aquiestaelmenu.com',
  webapp: process.env.APP_URL ?? 'https://aquiestaelmenu.com',
  media: process.env.MEDIA_URL ?? 'https://media.aquiestaelmenu.com',
};

const url = (path: string, base: 'api' | 'webapp' | 'media'): string => {
  const baseUrl = bases[base];
  const urlObject = new URL(path, baseUrl);
  return urlObject.toString();
};

export default url;
