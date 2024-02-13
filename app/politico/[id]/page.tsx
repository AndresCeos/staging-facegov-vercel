/* eslint-disable react/no-array-index-key */

'use client';

import moment from 'moment';

import { MdOutlineStar } from 'react-icons/md';

import { usePoliticalFigureById } from '@/api/political-figures';
import QueryResult from '@/components/QueryResult';
import PoliticalFigureComments from '@/features/politicalFigures/comments/PoliticalFigureComments';
import PoliticalFigureRelatedList from '@/features/politicalFigures/PoliticalFigureRelatedList';
import formatMoney from '@/utils/formatMoney';

type Props = {
  params: {
    id: string;
  };
};

function Page({ params }: Props) {
  const { id } = params;

  const politicalFigure = usePoliticalFigureById(Number(id));

  return (
    <main>
      <QueryResult query={politicalFigure} isFullScreenLoader={false}>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="shadow-md rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={politicalFigure?.data?.results?.media?.[0]?.featured ? politicalFigure.data.results.media[0].featured : 'https://placehold.co/400'}
                  alt={`${politicalFigure.data?.results?.firstName} ${politicalFigure.data?.results?.lastName}`}
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 w-full">
                  <span className="sr-only">Rating: 4.5</span>
                  <div className="grid grid-cols-7 w-full col bg-white bg-opacity-15 py-2 place-items-center">
                    <span />
                    {Array.from({ length: Math.ceil(politicalFigure.data?.results?.rating ?? 0) }).map((_, index) => (
                      <MdOutlineStar key={`star${index}`} className="text-5xl text-yellow-500" />
                    ))}
                    {Array.from({ length: 5 - Math.ceil(politicalFigure.data?.results?.rating ?? 0) }).map((_, index) => (
                      <MdOutlineStar key={`no-start-${index}`} className="text-5xl text-gray-500" />
                    ))}
                    <span className="text-sm">{politicalFigure.data?.results?.rating}</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h2 className="font-medium pb-2">{`${politicalFigure?.data?.results?.firstName} ${politicalFigure?.data?.results?.lastName}`}</h2>
                <div className="text-sm text-gray-500 font-medium">
                  <span className="font-normal text-gray-500 mr-1">
                    Partido Político:
                  </span>
                  {politicalFigure?.data?.results?.politicalParty.acronym}
                </div>
                { politicalFigure?.data?.results?.employmentHistory?.[0] && (
                <div className="text-sm text-gray-500 font-medium">
                  <span className="font-normal text-gray-500 mr-1">
                    Cargo:
                  </span>
                    {politicalFigure?.data?.results?.employmentHistory?.[0]?.jobTitle}
                </div>
                )}
                <div className="text-sm text-gray-500 font-medium">
                  <span className="font-normal text-gray-500 mr-1">
                    Lugar:
                  </span>
                  {`${politicalFigure?.data?.results?.city.name}, ${politicalFigure?.data?.results?.city.state.name}`}
                </div>
                { politicalFigure?.data?.results?.employmentHistory?.[0] && (
                <div className="text-sm text-gray-500 font-medium">
                  <span className="font-normal text-gray-500 mr-1">
                    Salario:
                  </span>
                    {formatMoney(politicalFigure?.data?.results?.employmentHistory?.[0]?.salary)}
                </div>
                )}
                <div className="text-sm text-gray-500 font-medium">
                  <span className="font-normal text-gray-500 mr-1">
                    Edad:
                  </span>
                  {`${moment().diff(politicalFigure?.data?.results?.birthDate, 'years')} años`}
                </div>
                { politicalFigure?.data?.results?.scholarships?.[0] && (
                <div className="text-sm text-gray-500 font-medium">
                  <span className="font-normal text-gray-500 mr-1">
                    Escolaridad:
                  </span>
                    {politicalFigure?.data?.results?.scholarships?.[0]?.name}
                </div>
                )}
                <div>
                  <h3 className="text-2xl mt-5 mb-3">Biografía</h3>
                  <p className="text-sm text-gray-500">{politicalFigure.data?.results?.biography}</p>
                </div>
              </div>
            </div>
          </div>
          {politicalFigure?.data?.results && <PoliticalFigureComments politicalFigure={politicalFigure?.data?.results} />}
        </div>
      </QueryResult>
      <div className="my-10">
        <h2 className="text-4xl mt-5 mb-3">Otros políticos</h2>
        <PoliticalFigureRelatedList politicalFigureId={Number(id)} />
      </div>
    </main>
  );
}

export default Page;
