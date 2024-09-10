import { Md5 } from 'ts-md5';

const navigatorShare = async (politicalFigure: Api.PoliticalFigure, comment?: Api.Comment) => {
  const md5CommentId = comment?.id ? Md5.hashStr(comment.id.toString()) : '';
  const politicalFigureUrl = new URL(`/politico/${politicalFigure.slug}`, process.env.APP_URL).toString();
  const imageUrl = new URL(
    `/${politicalFigure.slug}/${comment?.id ? `comment/${md5CommentId}/comment.jpeg` : 'nav/mobile.jpeg'}`,
    process.env.MEDIA_URL,
  ).toString();
  const fetchedImage = await fetch(imageUrl);
  const blobImage = await fetchedImage.blob();
  const fileImage = `${politicalFigure.firstName} ${politicalFigure.lastName}.png`;
  const filesArray = [
    new File([blobImage], fileImage, {
      type: 'image/jpeg',
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
