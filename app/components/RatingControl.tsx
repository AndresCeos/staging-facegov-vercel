import cx from 'classnames';
import { useState } from 'react';
import { MdOutlineStar } from 'react-icons/md';

type RatingControlProps = {
  rating: number;
  setRating?: (value: number) => void;
  className?: string;
};

type StarsProps = {
  isFilled: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  className?: string;
};

function Stars({
  isFilled, onClick, onMouseEnter, onMouseLeave, className = '',
}: StarsProps) {
  return (
    <MdOutlineStar
      className={cx(className, 'cursor-pointer', isFilled ? 'text-yellow-500' : 'text-gray-300')}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}

function RatingControl({ rating, setRating, className = '' }: RatingControlProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingChange = (value: number) => {
    if (setRating) {
      setRating(value);
    }
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
          className={className}
        />
      ))}
    </div>
  );
}

export default RatingControl;
