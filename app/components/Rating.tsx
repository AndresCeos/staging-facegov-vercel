import { MdOutlineStar } from 'react-icons/md';

type Props = {
  rating: number;
};

function Rating({ rating }: Props) {
  const rating100 = 100 - (rating * 20);

  return (
    <div className="absolute w-full bottom-0 bg-black bg-opacity-15 p-2">
      <div className="max-w-[50%] relative mx-auto">
        <div className="stars_container grid grid-cols-5 w-full place-items-center">
          <MdOutlineStar className="text-5xl" />
          <MdOutlineStar className="text-5xl" />
          <MdOutlineStar className="text-5xl" />
          <MdOutlineStar className="text-5xl" />
          <MdOutlineStar className="text-5xl" />
          <div className="cover" style={{ width: `${rating100}%` }} />
        </div>
      </div>
    </div>
  );
}

export default Rating;
