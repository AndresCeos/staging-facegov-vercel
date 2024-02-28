import cx from 'classnames';
import { useState } from 'react';

import { PiArrowSquareDown, PiArrowSquareUp } from 'react-icons/pi';

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

  if (!isSignedIn.data?.data?.authenticated) {
    return (
      <div className="flex flex-col justify-center items-center w-7 pr-4">
        <LoginModal
          className="!px-1 !py-1 !text-gray-500 bg-transparent hover:bg-transparent hover:text-gray-700 !outline-none !focus:outline-none !focus:ring-0"
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <PiArrowSquareUp className="text-2xl" />
          <span className="sr-only">Comment up</span>
        </LoginModal>
        <span className="mx-1 font-bold">{comment?.utility ?? 0}</span>
        <LoginModal
          className="!px-1 !py-1 !text-gray-500 bg-transparent hover:bg-transparent hover:text-gray-700 !outline-none !focus:outline-none !focus:ring-0"
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <PiArrowSquareDown className="text-2xl" />
          <span className="sr-only">Comment down</span>
        </LoginModal>
      </div>
    );
  }

  if (comment.commentedByUser) {
    return (
      <div className="flex flex-col justify-center items-center w-7 pr-4">
        <button
          className="!px-1 !py-1 !text-gray-500 bg-transparent hover:bg-transparent hover:text-gray-700 !outline-none !focus:outline-none !focus:ring-0"
          type="button"
          disabled
        >
          <PiArrowSquareUp className="text-2xl" />
          <span className="sr-only">Comment up</span>
        </button>
        <span className="mx-1 font-bold">{comment?.utility ?? 0}</span>
        <button
          className="!px-1 !py-1 !text-gray-500 bg-transparent hover:bg-transparent hover:text-gray-700 !outline-none !focus:outline-none !focus:ring-0"
          type="button"
          disabled
        >
          <PiArrowSquareDown className="text-2xl" />
          <span className="sr-only">Comment down</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-7 pr-4">
      <button
        className={cx(
          '!px-1 !py-1 bg-transparent hover:bg-transparent hover:text-gray-700 !outline-none !focus:outline-none !focus:ring-0',
          comment.userUtility === true && '!text-blue-500',
          comment.userUtility !== true && '!text-gray-500',
        )}
        type="button"
        onClick={() => handleCommentUtility('true')}
      >
        <PiArrowSquareUp className="text-2xl" />
        <span className="sr-only">Comment up</span>
      </button>
      <span className="mx-1 font-bold">{comment?.utility ?? 0}</span>
      <button
        className={cx(
          '!px-1 !py-1 bg-transparent hover:bg-transparent hover:text-gray-700 !outline-none !focus:outline-none !focus:ring-0',
          comment.userUtility === false && '!text-red-500',
          comment.userUtility !== false && '!text-gray-500',
        )}
        type="button"
        onClick={() => handleCommentUtility('false')}
      >
        <PiArrowSquareDown className="text-2xl" />
        <span className="sr-only">Comment down</span>
      </button>
    </div>
  );
}

export default PoliticalFigureCommentUtility;
