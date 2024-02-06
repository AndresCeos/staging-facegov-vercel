import cx from 'classnames';
import { useState } from 'react';
import { MdOutlineStar } from 'react-icons/md';

type RatingControlProps = {
  rating: number;
  setRating: (value: number) => void;
};

type StarsProps = {
  isFilled: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

function Stars({
  isFilled, onClick, onMouseEnter, onMouseLeave,
}: StarsProps) {
  return (
    <MdOutlineStar
      className={cx('text-2xl cursor-pointer', isFilled ? 'text-yellow-500' : 'text-gray-300')}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}

function RatingControl({ rating, setRating }: RatingControlProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingChange = (value: number) => {
    setRating(value);
    setHoverRating(value === 4 || value === 5 ? value : 0);
  };

  const handleHoverRating = (value: number) => {
    setHoverRating(value >= 5 ? 5 : value);
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((value) => (
        <Stars
          key={value}
          isFilled={value <= (hoverRating || rating)}
          onClick={() => handleRatingChange(value)}
          onMouseEnter={() => handleHoverRating(value)}
          onMouseLeave={() => handleHoverRating(0)}
        />
      ))}
    </div>
  );
}

export default RatingControl;
