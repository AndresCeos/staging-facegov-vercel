'use client';

import { useState } from 'react';

import moment from 'moment';

import { GrShare } from 'react-icons/gr';

import profileAcronym from '@/utils/profileAcronym';
import PoliticalFigureCommentRating from './PoliticalFigureCommentRating';
import PoliticalFigureCommentUtility from './PoliticalFigureCommentUtility';

import 'moment/locale/es';
import { FaFacebook } from 'react-icons/fa';

moment.locale('es');

type PoliticalFigureCommentsListItemProps = {
  comment: Api.Comment;
  politicalFigureId: number;
};

function PoliticalFigureCommentsListItem({ comment, politicalFigureId }: PoliticalFigureCommentsListItemProps) {
const [showTooltipComment, setShowTooltipComment] = useState(false);

  return (
    <article className="my-20 text-base" id={`political-figure-comment-${comment.id}`}>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col items-center mb-5 mx-auto md:border-r-2 md:border-gray-300 w-full max-w-[13rem] md:min-h-64">
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
            <PoliticalFigureCommentUtility comment={comment} politicalFigureId={politicalFigureId} />
            <p className="text-gray-500 w-full">
              {comment.text}
            </p>
          </div>
          <div className="flex justify-end">
          <button
              className="text-2xl font-light cursor-pointer"
              onClick={() => setShowTooltipComment(!showTooltipComment)}
            >
              <span className="sr-only">Compartir</span>
              <GrShare className="text-gray-500 cursor-pointer" />
            </button>
            {showTooltipComment && (
              <div className="absolute bg-white shadow-lg p-3 mt-8 rounded-lg">
                <a
                  className="text-2xl font-light cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                  // eslint-disable-next-line max-len
                  href={`http://www.facebook.com/sharer.php?u=https://srv489338.hstgr.cloud/politico/${politicalFigureId}/?comment=${comment.id}&t=Acabo de calificar a ${comment.user.firstName} ${comment.user.lastName} en FACESGOV. `}
                >
                  <span className="sr-only">Compartir</span>
                  <FaFacebook className="text-4xl hover:text-blue-700" />
                </a>
                </div>
            )}

          </div>
        </div>
      </div>
    </article>
  );
}

export default PoliticalFigureCommentsListItem;
