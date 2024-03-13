import Link from 'next/link';

import { HiArrowRight } from 'react-icons/hi';

import Rating from '@/components/Rating';
import formatMoney from '@/utils/formatMoney';

type PoliticalFiguresListProps = {
  politicalFigures: Api.PoliticalFigure[];
};

function PoliticalFiguresList({ politicalFigures }: PoliticalFiguresListProps) {
  if (politicalFigures.length === 0) {
    return <h2 className="text-gray-700 text-2xl text-center my-10">No hay coincidencias con tu búsqueda.</h2>;
  }

  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
      {politicalFigures.map((politicalFigure) => (
        <li key={politicalFigure.id} className="rounded-md shadow-lg overflow-hidden hover:shadow-xl  xl:w-[375px]">
          <Link href={`/politico/${politicalFigure.id}`}>
            <div>
              <img
                src={politicalFigure?.media?.[0]?.featured ? politicalFigure.media[0].featured : 'https://placehold.co/375'}
                alt={`${politicalFigure.firstName} ${politicalFigure.lastName}`}
                className="w-full lg:w-[375px] lg:h-[375px] object-cover"
                loading='lazy'
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
                  <span>{politicalFigure.politicalParty.acronym}</span>
                  {politicalFigure.employmentHistory?.[0] && <span>{formatMoney(politicalFigure.employmentHistory?.[0]?.salary)}</span>}
                </div>
                <div className="hover:underline">
                  Calificar
                  <HiArrowRight className="inline-block" />
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default PoliticalFiguresList;
