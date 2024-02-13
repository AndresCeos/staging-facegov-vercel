import moment from 'moment';
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
    <article className="p-6 text-base bg-white rounded-lg">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
            <img src={`https://placehold.co/80?text=${profileAcronym(comment.user.firstName, comment.user.lastName)}`} alt="profile" className="mr-2 w-6 h-6 rounded-full" />
            {`${comment.user.firstName} ${comment.user.lastName}`}
          </p>
          <p className="text-sm text-gray-600 ">
            <time>{moment(comment.createdAt).format('MMM Do YYYY')}</time>
          </p>
        </div>
        <PoliticalFigureCommentUtility comment={comment} politicalFigureId={politicalFigureId} />
      </footer>
      <p className="text-gray-500 ">
        {comment.text}
      </p>
      <div className="flex mt-3">
        <PoliticalFigureCommentRating rating={comment.rating} />
      </div>
    </article>
  );
}

export default PoliticalFigureCommentsListItem;
