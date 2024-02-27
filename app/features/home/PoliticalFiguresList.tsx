/* eslint-disable react/no-array-index-key */
import Link from 'next/link';

import Rating from '@/components/Rating';
import formatMoney from '@/utils/formatMoney';

type PoliticalFiguresListProps = {
  politicalFigures: Api.PoliticalFigure[];
};

function PoliticalFiguresList({ politicalFigures }: PoliticalFiguresListProps) {
  if (politicalFigures.length === 0) {
    return <div>No hay datos.</div>;
  }

  return (
    <ul className="grid grid-cols-3 gap-4">
      {politicalFigures.map((politicalFigure) => (
        <li key={politicalFigure.id} className="rounded-md shadow-md overflow-hidden hover:shadow-xl w-[375px]">
          <Link href={`/politico/${politicalFigure.id}`}>
            <div>
              <img
                src={politicalFigure?.media?.[0]?.featured ? politicalFigure.media[0].featured : 'https://placehold.co/375'}
                alt={`${politicalFigure.firstName} ${politicalFigure.lastName}`}
                className="w-[375px] h-[375px] object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h2 className="font-medium grow">
                  {`${politicalFigure.firstName} ${politicalFigure.lastName}`}
                </h2>
                <Rating className="w-[100px]" rating={+politicalFigure.rating} ratingSize="2xl" />
              </div>
              <div className="text-sm text-gray-500 font-medium">
                {politicalFigure.politicalParty.acronym}
              </div>
              { politicalFigure.employmentHistory?.[0] && (
                <div className="text-sm text-gray-500 font-medium">
                    {formatMoney(politicalFigure.employmentHistory?.[0]?.salary)}
                </div>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default PoliticalFiguresList;
