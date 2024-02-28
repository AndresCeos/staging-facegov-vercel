import moment from 'moment';
import { GrShare } from 'react-icons/gr';
import PoliticalFigureCommentRating from './PoliticalFigureCommentRating';
import PoliticalFigureCommentUtility from './PoliticalFigureCommentUtility';

type PoliticalFigureCommentsListItemProps = {
  comment: Api.Comment;
  politicalFigureId: number;
};
// eslint-disable-next-line max-len
const profileAcronym = (firstName: string | null, lastName: string | null) => ((firstName === null || lastName == null) ? 'S' : `${firstName.charAt(0) ?? ''}${lastName.charAt(0) ?? 'S'}`.toUpperCase());

function PoliticalFigureCommentsListItem({ comment, politicalFigureId }: PoliticalFigureCommentsListItemProps) {
  return (
    <article className="my-20 text-base" id={`political-figure-comment-${comment.id}`}>
      <div className="flex">
        <div className="flex flex-col items-center border-r-2 border-gray-300 w-full max-w-[13rem] min-h-64">
          <img
            src={`https://placehold.co/80?text=${profileAcronym(comment.user.firstName, comment.user.lastName)}`}
            alt="profile"
            className="w-20 h-20 rounded-full"
          />
          <p className="text-gray-900 font-bold mt-5 mb-11">
            {`${comment.user.firstName} ${comment.user.lastName}`}
          </p>
          <span className="text-sm text-gray-500">12 comentarios</span>
        </div>
        <div className="flex flex-col pl-10">
          <div className="flex">
            <PoliticalFigureCommentRating rating={comment.rating} />
          </div>
          <p className="text-sm text-gray-500 mt-2 mb-2">
            <time>{moment(comment.createdAt).format('D MMMM YYYY')}</time>
          </p>
          <div className="flex">
            <PoliticalFigureCommentUtility comment={comment} politicalFigureId={politicalFigureId} />
            <p className="text-gray-500 ">
              {comment.text}
            </p>
          </div>
          <div className="flex justify-end">
            <GrShare className="text-gray-500" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default PoliticalFigureCommentsListItem;
