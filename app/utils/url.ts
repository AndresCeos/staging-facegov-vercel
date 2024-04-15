const url = (path: string, base: 'api' | 'webapp'): string => {
  const baseUrl = base === 'api' ? process.env.API_URL : process.env.APP_URL;
  const urlObject = new URL(path, baseUrl);
  return urlObject.toString();
};

export default url;
