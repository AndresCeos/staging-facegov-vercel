/* eslint-disable max-len */
import cx from 'classnames';
import Link from 'next/link';

import { HiArrowRight } from 'react-icons/hi';

import Rating from '@/components/Rating';
import formatNameSlug from '@/utils/formatNameSlug';

type PoliticalFiguresListProps = {
  politicalFigures: Api.PoliticalFigure[];
};

function PoliticalFiguresList({ politicalFigures }: PoliticalFiguresListProps) {
  if (politicalFigures.length === 0) {
    return <h2 className="text-gray-700 text-2xl text-center my-10">No hay coincidencias con tu búsqueda.</h2>;
  }


  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3">
      {politicalFigures.map((politicalFigure, index) => (
        <li>
          <div
            key={politicalFigure.id}
            className={cx(
              'rounded-md bg-white shadow-lg overflow-hidden hover:shadow-xl xl:w-[375px]',
              (index >= 1 && (index - 1) % 3 === 0) ? 'mt-10' : '-mt-10',
            )}
          >
            <Link href={`/politico/${politicalFigure.slug}`}>
              <div>
                <img
                  src={politicalFigure?.media?.[0]?.featured ? politicalFigure.media[0].featured : 'https://placehold.co/375'}
                  alt={`${politicalFigure.firstName} ${politicalFigure.lastName}`}
                  className="w-full lg:w-[375px] l object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h2 className="font-medium grow min-h-12">
                    {`${politicalFigure.firstName} ${politicalFigure.lastName}`}
                  </h2>
                  <Rating className="w-[100px]" rating={+politicalFigure.rating} ratingSize="2xl" />
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-gray-500 font-medium flex flex-col">
                    {politicalFigure.employmentHistory?.[0] ? <span>{`${(politicalFigure.employmentHistory?.[0].candidate) ? 'Candidato  ' : ''} ${politicalFigure.employmentHistory?.[0]?.jobTitle}`}</span> : 'PENDIENTE'}
                  </div>
                  <div className="hover:underline flex items-center">
                    Calificar&nbsp;
                    <HiArrowRight className="inline-block" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default PoliticalFiguresList;
