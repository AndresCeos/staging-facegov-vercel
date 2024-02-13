import cx from 'classnames';
import { useState } from 'react';

import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';

import { useIsSignedIn } from '@/api/authentication';
import { mutateCommentUtility } from '@/api/comments';
import LoginModal from '@/features/login/LoginModal';

type PoliticalFigureCommentUtilityProps = {
  comment: Api.Comment;
  politicalFigureId: number;
};

function PoliticalFigureCommentUtility({ comment, politicalFigureId }: PoliticalFigureCommentUtilityProps) {
  const isSignedIn = useIsSignedIn();
  const [showModal, setShowModal] = useState(false);

  const mutate = mutateCommentUtility();

  const handleCommentUtility = (utility: 'true' | 'false') => {
    mutate.mutate({ commentId: comment.id, utility, politicalFigureId });
  };

  return (
    <div className="flex justify-center items-center">
      {isSignedIn.data?.data?.authenticated === true ? (
        <button
          className={cx(
            'inline-flex items-center p-2 text-sm font-medium text-center text-gray-500  bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50',
            comment.userUtility === true && 'text-blue-500',
          )}
          type="button"
          onClick={() => handleCommentUtility('true')}
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
      <span className="mx-1 font-bold">{comment?.utility ?? 0}</span>
      {isSignedIn.data?.data?.authenticated === true ? (
        <button
          className={cx(
            'inline-flex items-center p-2 text-sm font-medium text-center text-gray-500  bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50',
            comment.userUtility === false && 'text-red-500',
          )}
          type="button"
          onClick={() => handleCommentUtility('false')}
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
  );
}

export default PoliticalFigureCommentUtility;
