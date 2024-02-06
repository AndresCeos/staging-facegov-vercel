import Link from 'next/link';
import { MdOutlineStar, MdOutlineStarHalf } from 'react-icons/md';

type PoliticalFiguresListProps = {
  politicalFigures: Api.PoliticalFigure[];
};

function PoliticalFiguresList({ politicalFigures }: PoliticalFiguresListProps) {
  if (politicalFigures.length === 0) {
    return <div>No hay datos.</div>;
  }

  return (
    <ul className="grid grid-cols-4 gap-4">
      {politicalFigures.map((politicalFigure) => (
        <li key={politicalFigure.id} className="rounded-md shadow-md overflow-hidden">
          <Link href={`/politico/${politicalFigure.id}`}>
            <div className="relative">
              <img
                src="https://placehold.co/400"
                alt={`${politicalFigure.firstName} ${politicalFigure.lastName}`}
                className="w-full h-auto"
              />
              <div className="absolute bottom-0">
                <span className="sr-only">Rating: 4.5</span>
                <div className="grid grid-cols-7 w-full col bg-white bg-opacity-15">
                  <MdOutlineStar className="text-5xl text-yellow-500 col-start-2" />
                  <MdOutlineStar className="text-5xl text-yellow-500" />
                  <MdOutlineStar className="text-5xl text-yellow-500" />
                  <MdOutlineStar className="text-5xl text-yellow-500" />
                  <MdOutlineStarHalf className="text-5xl text-yellow-500" />
                </div>
              </div>
            </div>
            <div className="p-4">
              <h2 className="font-medium pb-2">{`${politicalFigure.firstName} ${politicalFigure.lastName}`}</h2>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">{politicalFigure.politicalParty.acronym}</p>
                <p className="text-sm text-gray-500">{`${politicalFigure.city.name}, ${politicalFigure.city.state.name}`}</p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default PoliticalFiguresList;
