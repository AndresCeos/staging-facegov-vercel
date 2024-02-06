'use client';

import { MdOutlineStar, MdOutlineStarHalf } from 'react-icons/md';

import { usePoliticalFigureById } from '@/api/political-figures';
import QueryResult from '@/components/QueryResult';
import PoliticalFigureComments from '@/features/politicalFigures/PoliticalFigureComments';

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
                  src="https://placehold.co/400"
                  alt={`${politicalFigure.data?.results?.firstName} ${politicalFigure.data?.results?.lastName}`}
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 w-full">
                  <span className="sr-only">Rating: 4.5</span>
                  <div className="grid grid-cols-7 w-full col bg-white bg-opacity-15 py-2">
                    <MdOutlineStar className="text-5xl text-yellow-500 col-start-2" />
                    <MdOutlineStar className="text-5xl text-yellow-500" />
                    <MdOutlineStar className="text-5xl text-yellow-500" />
                    <MdOutlineStar className="text-5xl text-yellow-500" />
                    <MdOutlineStarHalf className="text-5xl text-yellow-500" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h2 className="font-medium">{`${politicalFigure.data?.results?.firstName} ${politicalFigure.data?.results?.lastName}`}</h2>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">{politicalFigure.data?.results?.politicalParty.acronym}</p>
                  <p className="text-sm text-gray-500">{`${politicalFigure.data?.results?.city.name}, ${politicalFigure.data?.results?.city.state.name}`}</p>
                </div>
              </div>
            </div>
          </div>
          {politicalFigure?.data?.results && <PoliticalFigureComments politicalFigure={politicalFigure?.data?.results} />}
        </div>
      </QueryResult>
    </main>
  );
}

export default Page;
