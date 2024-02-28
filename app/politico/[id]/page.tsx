'use client';

import moment from 'moment';

import { GrShare } from 'react-icons/gr';

import { usePoliticalFigureById } from '@/api/political-figures';
import QueryResult from '@/components/QueryResult';
import Rating from '@/components/Rating';
import PoliticalFigureRelatedList from '@/features/politicalFigures/PoliticalFigureRelatedList';
import PoliticalFigureCommentForm from '@/features/politicalFigures/comments/PoliticalFigureCommentForm';
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
      <QueryResult query={politicalFigure} isFullScreenLoader>
        <div className="my-14 grid md:grid-cols-2 relative">
          <div className="grid place-items-center z-10">
            <img
              src={politicalFigure?.data?.results?.media?.[0]?.featured ? politicalFigure.data.results.media[0].featured : 'https://placehold.co/400'}
              alt={`${politicalFigure.data?.results?.firstName} ${politicalFigure.data?.results?.lastName}`}
              className="w-[500px] h-[500px] object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="pt-5">
            <h2 className="text-4xl text-center font-light">
              {`${politicalFigure.data?.results?.firstName} ${politicalFigure.data?.results?.lastName}`}
            </h2>
            <h2 className="text-4xl text-center font-light">
              {politicalFigure.data?.results?.politicalParty?.acronym}
            </h2>
            <div className="my-10 text-5xl font-bold text-center">
              {politicalFigure.data?.results?.rating}
            </div>
            <div className="pb-20">
              <Rating
                className="w-[220px] mx-auto"
                rating={politicalFigure.data?.results?.rating ?? 0}
                ratingSize="5xl"
              />
            </div>
            <div className="text-center flex mx-auto justify-center items-center gap-5 pt-20">
              <div className="text-2xl font-light">
                Comparte este
                <br />
                político
              </div>
              <GrShare className="text-4xl" />
            </div>
          </div>
          <div className="h-[1px] md:bg-black w-full absolute bottom-10" />
        </div>
        <div className="grid md:grid-cols-2">
          <div className="grid gap-2 md:grid-cols-2 md:border-r md:border-gray-950 px-14">
            <div className="col-span-2 md:mb-16">
              <h3 className="text-2xl">
                {`¿Quién es ${politicalFigure?.data?.results?.firstName} ${politicalFigure?.data?.results?.lastName}?`}
              </h3>
            </div>
            { politicalFigure?.data?.results?.employmentHistory?.[0] && (
              <div className="col-span-2 md:col-span-1 text-xl text-gray-950">
                {formatMoney(politicalFigure?.data?.results?.employmentHistory?.[0]?.salary)}
              </div>
            )}
            <div className="col-span-2 md:col-span-1 text-xl text-gray-950">
              { politicalFigure?.data?.results?.employmentHistory?.[0] && `${politicalFigure?.data?.results?.employmentHistory?.[0]?.jobTitle}, `}
              {`${politicalFigure?.data?.results?.city.name}, ${politicalFigure?.data?.results?.city.state.name}`}
            </div>
            <div className="col-span-2 md:col-span-1 text-xl text-gray-950">
              {`${moment().diff(politicalFigure?.data?.results?.birthDate, 'years')} años`}
            </div>
            { politicalFigure?.data?.results?.scholarships?.[0] && (
              <div className="col-span-2 md:col-span-1 text-xl text-gray-950">
                {politicalFigure?.data?.results?.scholarships?.[0]?.name}
              </div>
            )}
            <div className="col-span-2 md:mt-5">
              <p className="col-span-2 md:col-span-1 text-xl text-gray-950">{politicalFigure.data?.results?.biography}</p>
            </div>
          </div>
          <div className="px-14 mt-20 md:mt-0">
            {politicalFigure?.data?.results
            && (
              <PoliticalFigureCommentForm
                politicalFigure={politicalFigure?.data?.results}
              />
            )}
          </div>
        </div>
        {politicalFigure?.data?.results && <PoliticalFigureComments politicalFigure={politicalFigure?.data?.results} />}
      </QueryResult>
      <div className="my-10">
        <h2 className="text-4xl font-light my-7">Aquí puedes calificar a otros políticos</h2>
        <PoliticalFigureRelatedList politicalFigureId={Number(id)} />
      </div>
    </main>
  );
}

export default Page;
