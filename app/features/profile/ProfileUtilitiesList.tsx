'use client';

import moment from 'moment';
import Link from 'next/link';

import { GrShare } from 'react-icons/gr';

import { useUserCommentUtilities } from '@/api/users';
import QueryResult from '@/components/QueryResult';
import profileAcronym from '@/utils/profileAcronym';
import PoliticalFigureCommentRating from '../politicalFigures/comments/PoliticalFigureCommentRating';
import PoliticalFigureCommentUtility from '../politicalFigures/comments/PoliticalFigureCommentUtility';
import formatNameSlug from '@/utils/formatNameSlug';

function ProfileUtilitiesList() {
  const comments = useUserCommentUtilities({ offset: 0, limit: 10 });
  console.log(comments.data?.results)
  return (
    <QueryResult query={comments}>
      {comments.data?.results?.length === 0 && (
        <h2 className="text-gray-500 text-2xl my-10">No has calificado ningún comentario político aún</h2>
      )}
      {comments.data?.results?.map((comment) => (
        <div key={comment.id}>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col items-center mb-5 mx-auto md:border-r-2 md:border-gray-0 w-full max-w-[13rem] md:min-h-64">
              <img
                src={`https://placehold.co/80?text=${profileAcronym(comment.user.firstName, comment.user.lastName)}`}
                alt="profile"
                className="w-10 md:w-20 h-10 md:h-20 rounded-full"
              />
              <p className="text-gray-900 font-bold md:mt-5 md:mb-11">
                {`${comment.user.firstName} ${comment.user.lastName}`}
              </p>
              <span className="text-sm text-gray-500">12 comentarios</span>
            </div>
            <div className="flex flex-col pl-10 w-full">
              <div className="flex">
                <PoliticalFigureCommentRating rating={comment.rating} />
              </div>
              <p className="text-sm text-gray-500 mt-2 mb-2">
                <time>{moment(comment.createdAt).format('D MMMM YYYY')}</time>
              </p>
              <div className="flex">
                <PoliticalFigureCommentUtility comment={comment as never} politicalFigureSlug={comment.politicalFigure.slug} />
                <p className="text-gray-500 w-full">
                  {comment.text}
                </p>
              </div>
              <div className="flex justify-end">
                <GrShare className="text-gray-500 cursor-pointer" />
              </div>
              <div className="flex gap-2 mb-4">
                <div className="font-medium">
                  Calificacion hecha a
                </div>
                <Link href={`/politico/${formatNameSlug(`${comment.politicalFigure.firstName} ${comment.politicalFigure.lastName}`)}`} className="text-blue-400">
                  {`${comment.politicalFigure.firstName} ${comment.politicalFigure.lastName}`}
                </Link>
              </div>
            </div>
          </div>
          <hr className="my-10" />
        </div>
      ))}
    </QueryResult>
  );
}

export default ProfileUtilitiesList;
