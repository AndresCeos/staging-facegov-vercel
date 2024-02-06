/* eslint-disable react/no-array-index-key */
import Link from 'next/link';
import { MdOutlineStar } from 'react-icons/md';

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
                src={politicalFigure?.media?.[0]?.featured ? politicalFigure.media[0].featured : 'https://placehold.co/400'}
                alt={`${politicalFigure.firstName} ${politicalFigure.lastName}`}
                className="w-full h-auto"
              />
              <div className="absolute bottom-0">
                <div className="grid grid-cols-7 w-full col bg-white bg-opacity-15 place-items-center">
                  <span />
                  {Number(politicalFigure.rating) !== 0 && (
                    <>
                      {Array.from({ length: Math.ceil(politicalFigure.rating) }).map((_, index) => (
                        <MdOutlineStar key={`star${index}`} className="text-5xl text-yellow-500" />
                      ))}
                      {Array.from({ length: 5 - Math.ceil(politicalFigure.rating) }).map((_, index) => (
                        <MdOutlineStar key={`no-start-${index}`} className="text-5xl text-gray-500" />
                      ))}
                      <span className="text-sm">{politicalFigure.rating}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4">
              <h2 className="font-medium pb-2">{`${politicalFigure.firstName} ${politicalFigure.lastName}`}</h2>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">{politicalFigure.politicalParty.acronym}</p>
                <p className="text-sm text-gray-500 text-right">
                  {`${politicalFigure.city.name}`}
                  <br />
                  {`${politicalFigure.city.state.name}`}
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default PoliticalFiguresList;
