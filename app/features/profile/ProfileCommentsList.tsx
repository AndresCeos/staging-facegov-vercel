/* eslint-disable max-len */

'use client';

import moment from 'moment';
import Link from 'next/link';

import { useUserComments } from '@/api/users';
import QueryResult from '@/components/QueryResult';
import Share from '@/components/Share';
import formatNameSlug from '@/utils/formatNameSlug';
import PoliticalFigureCommentRating from '../politicalFigures/comments/PoliticalFigureCommentRating';
import PoliticalFigureCommentUtility from '../politicalFigures/comments/PoliticalFigureCommentUtility';

function ProfileCommentsList() {
  const comments = useUserComments({ offset: 0, limit: 10 });

  return (
    <QueryResult query={comments}>
      {comments.data?.results?.length === 0 && (
        <h2 className="text-gray-500 text-2xl my-10">No has calificado a ningún político aún</h2>
      )}
      <h1 className="text-2xl font-bold my-10 text-center">Mis comentarios</h1>
      {comments.data?.results?.map(async (comment) => (
        <div key={comment.id}>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col items-center mb-5 mx-auto md:border-r-2 md:border-gray-300 w-full max-w-[13rem] md:min-h-64">
              <img
                src={(comment.politicalFigure.media as any).find((media: { key: string; }) => media?.key === 'featured')?.url ? `${process.env.MEDIA_URL}/${(comment.politicalFigure.media as any).find((media: { key: string; }) => media?.key === 'featured')?.url}` : 'https://placehold.co/375'}
                alt="profile"
                className="w-10 md:w-20 h-10 md:h-20 rounded-full object-cover"
              />
              <Link href={`/politico/${formatNameSlug(`${comment.politicalFigure.firstName} ${comment.politicalFigure.lastName}`)}`} className="text-blue-950 text-center mt-3">
                {`${comment.politicalFigure.firstName} ${comment.politicalFigure.lastName}`}
              </Link>
            </div>
            <div className="flex flex-col pl-10 w-full">
              <div className="flex">
                <PoliticalFigureCommentRating rating={comment.rating} />
              </div>
              <p className="text-sm text-gray-500 mt-2 mb-2">
                <time>{moment(comment.createdAt).format('D MMMM YYYY')}</time>
              </p>
              <div className="flex">
                <PoliticalFigureCommentUtility comment={comment as any} politicalFigureSlug={formatNameSlug(`${comment.politicalFigure.firstName} ${comment.politicalFigure.lastName}`)} />
                <p className="text-gray-500 w-full">
                  {comment.text}
                </p>
              </div>
              <div className="flex justify-end">
                <Share
                  politicalFigure={comment.politicalFigure}
                  comment={comment as any}
                  className="text-2xl font-light cursor-pointer"
                  iconClassName="text-2xl"
                />
              </div>

            </div>
          </div>
          <hr className="my-10" />
        </div>
      ))}
    </QueryResult>
  );
}

export default ProfileCommentsList;
