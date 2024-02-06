import { MdOutlineStar } from 'react-icons/md';

type PoliticalFigureCommentRatingProps = {
  rating: number;
};

function PoliticalFigureCommentRating({ rating }: PoliticalFigureCommentRatingProps) {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const isFilled = index < rating;
    return (
      <MdOutlineStar
        key={index}
        className={`text-2xl ${isFilled ? 'text-yellow-500' : 'text-gray-300'}`}
      />
    );
  });
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{stars}</>;
}

export default PoliticalFigureCommentRating;
