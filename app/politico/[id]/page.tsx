/* eslint-disable react/no-array-index-key */

'use client';

import moment from 'moment';

import { usePoliticalFigureById } from '@/api/political-figures';
import QueryResult from '@/components/QueryResult';
import Rating from '@/components/Rating';
import PoliticalFigureRelatedList from '@/features/politicalFigures/PoliticalFigureRelatedList';
import PoliticalFigureComments from '@/features/politicalFigures/comments/PoliticalFigureComments';
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
                <Rating rating={politicalFigure.data?.results?.rating ?? 0} />
              </div>
              <div className="p-4">
                <h2 className="font-medium pb-2">
                  {`${politicalFigure.data?.results?.firstName} ${politicalFigure.data?.results?.lastName}`}
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ml-4">
                    {politicalFigure.data?.results?.rating}
                  </span>
                </h2>
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
