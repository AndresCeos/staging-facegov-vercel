'use client';

import moment from 'moment';

import { GrShare, GrValidate } from 'react-icons/gr';

import { usePoliticalFigureById } from '@/api/political-figures';
import QueryResult from '@/components/QueryResult';
import Rating from '@/components/Rating';
import PoliticalFigureRelatedList from '@/features/politicalFigures/PoliticalFigureRelatedList';
import PoliticalFigureCommentForm from '@/features/politicalFigures/comments/PoliticalFigureCommentForm';
import PoliticalFigureComments from '@/features/politicalFigures/comments/PoliticalFigureComments';
import formatMoney from '@/utils/formatMoney';
import RightOfReplyModal from './rightOfReplyModal';
import { useState } from 'react';

type PoliticalFigureContentProps = {
  id: string;
};

function PoliticalFigureContent({ id }: PoliticalFigureContentProps) {
  const politicalFigure = usePoliticalFigureById(Number(id));
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <QueryResult query={politicalFigure} isFullScreenLoader>
        <div className="my-14 grid md:grid-cols-2 relative">
          <div className="grid place-items-center z-10">
            <img
              src={politicalFigure?.data?.results?.media?.[0]?.featured ? politicalFigure.data.results.media[0].featured : 'https://placehold.co/400'}
              alt={`${politicalFigure.data?.results?.firstName} ${politicalFigure.data?.results?.lastName}`}
              className={`w-[500px] h-[500px] object-cover rounded-lg shadow-md ${politicalFigure.data?.results?.verify && 'border-4 border-cyan-400'}`}
            />
          </div>
          <div className="pt-5">
            <h2 className="text-4xl text-center font-light flex justify-center align-baseline">
              {`${politicalFigure.data?.results?.firstName} ${politicalFigure.data?.results?.lastName}`} 
              {politicalFigure.data?.results?.verify && <GrValidate className='ml-3 text-cyan-400 text-3xl' />}
            </h2><div className='my-3'></div>
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
              <a
                className="text-2xl font-light cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
                // eslint-disable-next-line max-len
                href={`http://www.facebook.com/sharer.php?u=https://srv489338.hstgr.cloud/politico/${politicalFigure.data?.results?.id}&t=Mira a ${politicalFigure.data?.results?.firstName} ${politicalFigure.data?.results?.lastName} en FACESGOV.`}
              >
                <span className="sr-only">Compartir</span>
                <GrShare className="text-4xl" />
              </a>
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
            <div className='col-span-2 md:mt-5'>
              <RightOfReplyModal
                className="h-14 !px-12"
                showModal={showModal}
                setShowModal={setShowModal}
                politicalFigureName={`${politicalFigure?.data?.results?.firstName} ${politicalFigure?.data?.results?.lastName}`}
              >Derecho de Réplica</RightOfReplyModal>
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
    </>
  );
}

export default PoliticalFigureContent;
