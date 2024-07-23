import cx from 'classnames';
import Link from 'next/link';

import Rating from '@/components/Rating';
import { extraBold, regular } from '@/fonts';

type PoliticalFiguresListProps = {
  politicalFigures: Api.PoliticalFigure[];
};

function PoliticalFiguresList({ politicalFigures }: PoliticalFiguresListProps) {
  if (politicalFigures.length === 0) {
    return (
      <h2 className="text-gray-700 text-2xl text-center my-10">
        No hay coincidencias con tu búsqueda.
      </h2>
    );
  }

  return (
    <ul className="grid gap-5 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2">
      {politicalFigures.map((politicalFigure, index) => (
        <li key={politicalFigure.id}>
          <div
            key={politicalFigure.id}
            className={cx(
              'rounded-3xl bg-white shadow-lg overflow-hidden hover:shadow-xl xl:w-[275px] ',
              (index >= 1 && (index - 1) % 2 === 0) ? 'mt-10' : '-mt-10',
              (politicalFigure.verify) && 'border-4 border-[#66DFD0] border-5',
            )}
          >
            <Link href={`/politico/${politicalFigure.slug}`}>
              <div className="h-[480px] relative">
                <div
                  className={cx(
                    'w-3/5 text-xs bg-[#FAB400] px-3 py-1 ml-3 rounded-3xl text-white flex flex-col absolute top-5',
                    regular.className,
                  )}
                >
                  {politicalFigure.employmentHistory?.[0]
                    ? (
                      <span>
                        {`${(politicalFigure.employmentHistory?.[0].candidate) ? 'Candidato ' : ''} ${politicalFigure.employmentHistory?.[0]?.jobTitle}`}
                      </span>
                    )
                    : 'PENDIENTE'}
                </div>
                <h2 className={cx('text-white text-2xl ml-5 min-h-12 absolute bottom-8', extraBold.className)}>
                  {`${politicalFigure.firstName} ${politicalFigure.lastName}`}
                </h2>
                <h3 className={cx('text-gray-100 ml-5 absolute bottom-4', regular.className)}>
                  { politicalFigure.politicalParty ? `${politicalFigure.politicalParty.acronym}` : 'SIN AFILIACIÓN'}
                </h3>
                <img
                  src={
                    politicalFigure?.media?.[0]?.featured
                      ? politicalFigure.media[0].featured
                      : 'https://placehold.co/375'
                  }
                  alt={`${politicalFigure.firstName} ${politicalFigure.lastName}`}
                  className="w-full lg:w-[275px] object-cover h-full"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-end">
                  <div className="flex items-start justify-center h-5">
                    <Rating className="w-[80px]" rating={+politicalFigure.rating} ratingSize="xl" />
                    <div className={cx('text-sm ml-3 hover:font-semibold hover:scale-100', regular.className)}>CALIFICA</div>
                  </div>
                  <img src="/Share.svg" alt="" width="20" />
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
