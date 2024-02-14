/* eslint-disable react/no-array-index-key */
import moment from 'moment';
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
        <li key={politicalFigure.id} className="rounded-md shadow-md overflow-hidden hover:shadow-xl">
          <Link href={`/politico/${politicalFigure.id}`}>
            <div className="relative">
              <img
                src={politicalFigure?.media?.[0]?.featured ? politicalFigure.media[0].featured : 'https://placehold.co/400'}
                alt={`${politicalFigure.firstName} ${politicalFigure.lastName}`}
                className="w-full h-auto"
              />
              <Rating rating={+politicalFigure.rating} />
            </div>
            <div className="p-4">
              <h2 className="font-medium pb-2">
                {`${politicalFigure.firstName} ${politicalFigure.lastName}`}
                <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ml-4">
                  {politicalFigure.rating}
                </span>
              </h2>
              <div className="text-sm text-gray-500 font-medium">
                <span className="font-normal text-gray-500 mr-1">
                  Partido Político:
                </span>
                {politicalFigure.politicalParty.acronym}
              </div>
              { politicalFigure.employmentHistory?.[0] && (
                <div className="text-sm text-gray-500 font-medium">
                  <span className="font-normal text-gray-500 mr-1">
                    Cargo:
                  </span>
                    {politicalFigure.employmentHistory?.[0]?.jobTitle}
                </div>
              )}
              <div className="text-sm text-gray-500 font-medium">
                <span className="font-normal text-gray-500 mr-1">
                  Lugar:
                </span>
                {`${politicalFigure.city.name}, ${politicalFigure.city.state.name}`}
              </div>
              { politicalFigure.employmentHistory?.[0] && (
                <div className="text-sm text-gray-500 font-medium">
                  <span className="font-normal text-gray-500 mr-1">
                    Salario:
                  </span>
                    {formatMoney(politicalFigure.employmentHistory?.[0]?.salary)}
                </div>
              )}
              <div className="text-sm text-gray-500 font-medium">
                <span className="font-normal text-gray-500 mr-1">
                  Edad:
                </span>
                {`${moment().diff(politicalFigure.birthDate, 'years')} años`}
              </div>
              { politicalFigure.scholarships?.[0] && (
                <div className="text-sm text-gray-500 font-medium">
                  <span className="font-normal text-gray-500 mr-1">
                    Escolaridad:
                  </span>
                    {politicalFigure.scholarships?.[0]?.name}
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
