'use client';

import moment from 'moment';

import profileAcronym from '@/utils/profileAcronym';
import PoliticalFigureCommentRating from './PoliticalFigureCommentRating';
import PoliticalFigureCommentUtility from './PoliticalFigureCommentUtility';

import Share from '@/components/Share';
import 'moment/locale/es';

moment.locale('es');

type PoliticalFigureCommentsListItemProps = {
  comment: Api.Comment;
  politicalFigure: Api.PoliticalFigure;
};

function PoliticalFigureCommentsListItem({ comment, politicalFigure }: PoliticalFigureCommentsListItemProps) {
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
        </div>
        <div className="flex flex-col pl-10 w-full">
          <div className="flex">
            <PoliticalFigureCommentRating rating={comment.rating} />
          </div>
          <p className="text-sm text-gray-500 mt-2 mb-2">
            <time>{moment(comment.createdAt).format('D MMMM YYYY')}</time>
          </p>
          <div className="flex">
            <PoliticalFigureCommentUtility comment={comment} politicalFigureSlug={politicalFigure.slug} />
            <p className="text-gray-500 w-full">
              {comment.text}
            </p>
          </div>
          <div className="flex justify-end">
            <Share
              politicalFigure={politicalFigure}
              comment={comment}
              className="text-2xl font-light cursor-pointer"
              iconClassName="text-2xl"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default PoliticalFigureCommentsListItem;
