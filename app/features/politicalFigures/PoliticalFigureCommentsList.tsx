import moment from 'moment';
import { useState } from 'react';

import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';

import { useIsSignedIn } from '@/api/authentication';
import { usePoliticalFigureComments } from '@/api/political-figures';
import QueryResult from '@/components/QueryResult';
import LoginModal from '../login/LoginModal';
import PoliticalFigureCommentRating from './PoliticalFigureCommentRating';

type PoliticalFigureCommentsListProps = {
  politicalFigure: Api.PoliticalFigure;
};

// eslint-disable-next-line max-len
const profileAcronym = (firstName: string | null, lastName: string | null) => ((firstName === null || lastName == null) ? 'S' : `${firstName.charAt(0) ?? ''}${lastName.charAt(0) ?? 'S'}`.toUpperCase());

function PoliticalFigureCommentsList({ politicalFigure }: PoliticalFigureCommentsListProps) {
  const [showModal, setShowModal] = useState(false);
  const comments = usePoliticalFigureComments(politicalFigure.id);
  const isSignedIn = useIsSignedIn();

  return (
    <QueryResult query={comments} isFullScreenLoader={false}>
      {comments?.data?.results?.map((comment) => (
        <article className="p-6 text-base bg-white rounded-lg" key={comment.id}>
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
            <div className="flex justify-center items-center">
              {isSignedIn.data?.data?.authenticated === true ? (
                <button
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500  bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                  type="button"
                >
                  <FiThumbsUp className="text-base" />
                  <span className="sr-only">Comment up</span>
                </button>
              ) : (
                <LoginModal
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500  bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                  showModal={showModal}
                  setShowModal={setShowModal}
                >
                  <FiThumbsUp className="text-base" />
                  <span className="sr-only">Comment up</span>
                </LoginModal>
              )}
              <span className="mx-1 font-bold">4</span>
              {isSignedIn.data?.data?.authenticated === true ? (
                <button
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500  bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                  type="button"
                >
                  <FiThumbsDown className="text-base" />
                  <span className="sr-only">Comment down</span>
                </button>
              ) : (
                <LoginModal
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500  bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                  showModal={showModal}
                  setShowModal={setShowModal}
                >
                  <FiThumbsDown className="text-base" />
                  <span className="sr-only">Comment down</span>
                </LoginModal>
              )}
            </div>
          </footer>
          <p className="text-gray-500 ">
            {comment.text}
          </p>
          <div className="flex mt-3">
            <PoliticalFigureCommentRating rating={comment.rating} />
          </div>
        </article>
      ))}
    </QueryResult>
  );
}

export default PoliticalFigureCommentsList;
