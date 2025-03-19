import { Md5 } from 'ts-md5';
import url from './url';

const navigatorShare = async (politicalFigure: Api.PoliticalFigure, comment?: Api.Comment) => {
  const md5CommentId = comment?.id ? Md5.hashStr(comment.id.toString()) : '';
  const politicalFigureUrl = url(`/politico/${politicalFigure.slug}`, 'webapp');
  const urlString = `${comment?.id ? `comment/${md5CommentId}/comment.jpeg` : 'nav/mobile.jpeg'}`;
  const imageUrl = url(`/${politicalFigure.slug}/${urlString}`, 'media');
  const fetchedImage = await fetch(imageUrl);
  const blobImage = await fetchedImage.blob();
  const fileImage = `${politicalFigure.firstName} ${politicalFigure.lastName}.jpeg`;
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
