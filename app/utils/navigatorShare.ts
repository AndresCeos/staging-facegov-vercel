const navigatorShare = async (politicalFigure: Api.PoliticalFigure, comment?: Api.Comment) => {
  const imageUrl = new URL(`/political-figures/${politicalFigure.slug}/nav-share${comment?.id && `${comment.id}/share-image`}`, process.env.API_URL).toString();
  const fetchedImage = await fetch(imageUrl);
  const blobImage = await fetchedImage.blob();
  const filesArray = [
    new File([blobImage], `${politicalFigure.slug || 'image'}.png`, {
      type: 'image/png',
      lastModified: Date.now(),
    }),
  ];
  const shareData = {
    title: `${politicalFigure.firstName} ${politicalFigure.lastName}`,
    files: filesArray,
    url: document.location.origin,
  };
  return shareData;
};

export default navigatorShare;
