const navigatorShare = async (politicalFigure: Api.PoliticalFigure, comment?: Api.Comment) => {
  const politicalFigureUrl = new URL(`/politico/${politicalFigure.slug}`, process.env.APP_URL).toString();
  const imageUrl = new URL(`/political-figures/${politicalFigure.slug}/${comment?.id ? `comments/${comment.id}/share-image` : 'nav-share'}`, process.env.API_URL).toString();
  const fetchedImage = await fetch(imageUrl);
  const blobImage = await fetchedImage.blob();
  const fileImage = `${politicalFigure.firstName} ${politicalFigure.lastName}.png`;
  const filesArray = [
    new File([blobImage], fileImage, {
      type: 'image/png',
      lastModified: Date.now(),
    }),
  ];
  const shareData = {
    title: fileImage,
    files: filesArray,
    url: politicalFigureUrl,
  };
  return shareData;
};

export default navigatorShare;
