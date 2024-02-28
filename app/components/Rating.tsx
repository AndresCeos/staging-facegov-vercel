import cx from 'classnames';
import { MdOutlineStar } from 'react-icons/md';

type Props = {
  rating: number;
  className?: string;
  ratingSize: string;
};

function Rating({ rating, className = '', ratingSize }: Props) {
  const rating100 = 100 - (rating * 20);

  return (
    <div className={cx('relative', className)}>
      <div className="absolute top-0">
        <div className="relative mx-auto">
          <div className="stars_container grid grid-cols-5 w-full place-items-center">
            <MdOutlineStar className={cx(`text-${ratingSize}`)} />
            <MdOutlineStar className={cx(`text-${ratingSize}`)} />
            <MdOutlineStar className={cx(`text-${ratingSize}`)} />
            <MdOutlineStar className={cx(`text-${ratingSize}`)} />
            <MdOutlineStar className={cx(`text-${ratingSize}`)} />
            <div className="cover" style={{ width: `${rating100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rating;
