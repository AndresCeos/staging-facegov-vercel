/* eslint-disable max-len */

'use client';

import { useState } from 'react';

import { GrValidate } from 'react-icons/gr';

import { usePoliticalFigureById } from '@/api/political-figures';
import QueryResult from '@/components/QueryResult';
import Rating from '@/components/Rating';
import PoliticalFigureCommentForm from '@/features/politicalFigures/comments/PoliticalFigureCommentForm';
import PoliticalFigureComments from '@/features/politicalFigures/comments/PoliticalFigureComments';

import FormModal from '@/utils/FormModal';
import VideoModal from '@/utils/VideoModal';
import PoliticalFigureRelatedList from './PoliticalFigureRelatedList';
import PoliticalFigureShare from './share/PoliticalFigureShare';

type PoliticalFigureContentProps = {
  slug: string;
};

function PoliticalFigureContent({ slug }: PoliticalFigureContentProps) {
  const politicalFigure = usePoliticalFigureById(slug);
  const [showModalReplica, setShowModalReplica] = useState(false);
  const [showModalVerify, setShowModalVerify] = useState(false);
  const [showModalVideo, setShowModalVideo] = useState(false);

  const isVerify = politicalFigure?.data?.results?.verify;

  const birthDate: Date | false = politicalFigure.data?.results?.birthDate ? new Date(politicalFigure.data?.results?.birthDate) : false;

  return (
    <>
      <QueryResult query={politicalFigure} isFullScreenLoader={false}>
        <div className="my-14 grid md:grid-cols-2 relative">
          <div className="grid place-items-center z-10">
            {isVerify
              ? (
                <VideoModal
                  setShowModal={setShowModalVideo}
                  showModal={showModalVideo}
                  media={politicalFigure?.data?.results?.media?.[1]?.videoVerify}
                  className="cursor-pointer "
                >
                  <img
                    src={politicalFigure?.data?.results?.media?.[0]?.featured ? politicalFigure.data.results.media[0].featured : 'https://placehold.co/400'}
                    alt={`${politicalFigure.data?.results?.firstName} ${politicalFigure.data?.results?.lastName}`}
                    className={`w-[500px] h-[700px] object-cover rounded-lg shadow-md ${isVerify && 'border-4 border-cyan-400 hover:border-8'}`}
                  />
                </VideoModal>
              )
              : (
                <img
                  src={politicalFigure?.data?.results?.media?.[0]?.featured ? politicalFigure.data.results.media[0].featured : 'https://placehold.co/400'}
                  alt={`${politicalFigure.data?.results?.firstName} ${politicalFigure.data?.results?.lastName}`}
                  className={`w-[500px] h-[700px] object-cover rounded-lg shadow-md ${isVerify && 'border-4 border-cyan-400'}`}
                />
              )}
          </div>
          <div className="pt-5 flex flex-col justify-center">
            <h2 className="text-4xl text-center font-light flex justify-center align-baseline">
              {`${politicalFigure.data?.results?.firstName} ${politicalFigure.data?.results?.lastName}`}
              {isVerify && <GrValidate className="ml-3 text-cyan-400 text-3xl" />}
            </h2>
            <div className="my-3" />
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

            {politicalFigure.data?.results
              && <PoliticalFigureShare politicalFigure={politicalFigure.data?.results} />}

          </div>
        </div>
        <>
          <div className="grid md:grid-cols-2">
            <div className="grid gap-2 md:grid-cols-2 md:border-r md:border-gray-950 md:px-14">
              <div className="col-span-2 md:mb-16">
                <h3 className="text-2xl">
                  {`¿Quién es ${politicalFigure?.data?.results?.firstName} ${politicalFigure?.data?.results?.lastName}?`}
                </h3>
              </div>
              <div className={`col-span-2 ${isVerify && 'md:col-span-1 '} text-xl text-gray-950`}>
                <p>
                  <b>Cargo: </b>
                  { politicalFigure?.data?.results?.employmentHistory?.[0] && `${politicalFigure?.data?.results.employmentHistory?.[0].candidate ? ' Candidato' : ''} ${politicalFigure?.data?.results?.employmentHistory?.[0]?.jobTitle} `}
                </p>
                <p>
                  <b>Estado: </b>
                  {politicalFigure?.data?.results?.city.name}
                </p>
                <p>
                  <b>Municipio: </b>
                  {politicalFigure?.data?.results?.city.state.name}
                </p>
                {isVerify && politicalFigure?.data?.results?.employmentHistory?.[0] && politicalFigure?.data?.results?.employmentHistory?.[0]?.salary !== 0 && (
                <p>
                  <b>Salario:</b>
                  $
                  {politicalFigure?.data?.results?.employmentHistory?.[0]?.salary}
                </p>
                )}
                {birthDate && (
                  <div>
                    <b>Fecha de Nacimiento:</b>
                    <p>
                      {birthDate.getDate()}
                      {' '}
                      de
                      {birthDate.toLocaleString('es-ES', { month: 'long' })}
                      {' '}
                      del
                      {birthDate.getFullYear()}
                    </p>
                  </div>
                )}
              </div>
              { (politicalFigure?.data?.results?.scholarships?.[0] && isVerify) && (
                <div className="col-span-2 md:col-span-1 text-xl text-gray-950">
                  <b>Escolaridad: </b>
                  {politicalFigure?.data?.results?.scholarships?.[0]?.name}
                </div>
              )}
              { isVerify && (
              <div className="col-span-2 md:mt-5">
                <p className="col-span-2 md:col-span-1 text-xl text-gray-950">{politicalFigure.data?.results?.biography}</p>
              </div>
              )}
              <div className="col-span-2 md:mt-5">
                <FormModal
                  className="h-14 !px-12"
                  showModal={showModalReplica}
                  setShowModal={setShowModalReplica}
                  politicalFigureName={`${politicalFigure?.data?.results?.firstName} ${politicalFigure?.data?.results?.lastName}`}
                  title="Derecho de Réplica"
                >
                  Derecho de Réplica
                </FormModal>
              </div>

              <div className="col-span-2 md:mt-5">
                { !isVerify && (
                <FormModal
                  className="h-14 !px-12"
                  showModal={showModalVerify}
                  setShowModal={setShowModalVerify}
                  politicalFigureName={`${politicalFigure?.data?.results?.firstName} ${politicalFigure?.data?.results?.lastName}`}
                  title="Verificar Político"
                >
                  <div className="flex align-baseline">
                    Verificar Político
                    <GrValidate className="ml-3 text-white text-1xl" />
                  </div>
                </FormModal>
                )}
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
        </>
      </QueryResult>
      <div className="my-10">
        <h2 className="text-4xl font-light my-7 pb-10">Aquí puedes calificar a otros políticos</h2>
        {politicalFigure?.data?.results?.id && (
          <PoliticalFigureRelatedList politicalFigureId={politicalFigure?.data?.results?.id} />
        )}
      </div>
    </>
  );
}

export default PoliticalFigureContent;
