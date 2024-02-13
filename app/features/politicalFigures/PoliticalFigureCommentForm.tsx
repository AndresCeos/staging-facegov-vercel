/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';

import { useIsSignedIn } from '@/api/authentication';
import mutateComment from '@/api/comments';
import QueryResult from '@/components/QueryResult';
import RatingControl from '@/components/RatingControl';
import LoginModal from '../login/LoginModal';

type PoliticalFigureCommentFormProps = {
  politicalFigure: Api.PoliticalFigure;
};

function PoliticalFigureCommentForm({ politicalFigure }: PoliticalFigureCommentFormProps) {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const isSignedIn = useIsSignedIn();

  const mutate = mutateComment();

  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line no-alert
    mutate.mutate({ rating, text, politicalFigureId: politicalFigure.id });
  };

  if (politicalFigure.canUserComment === false) {
    return null;
  }

  return (
    <QueryResult query={isSignedIn} isFullScreenLoader={false}>
      <form className="mb-6" onSubmit={handleCommentSubmit}>
        <div className="mb-4">
          <label htmlFor="rating" className="text-sm">Calificación:</label>
          <RatingControl rating={rating} setRating={setRating} />
        </div>
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200  ">
          <label htmlFor="comment" className="sr-only">
            Tú comentario
          </label>
          <textarea
            rows={6}
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
            placeholder="Escribe un comentario..."
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        {isSignedIn.data?.data?.authenticated === true ? (
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800"
          >
            Publicar comentario
          </button>
        ) : null }
      </form>
      {isSignedIn.data?.data?.authenticated === false ? (
        <LoginModal
          className='"inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800"'
          showModal={showModal}
          setShowModal={setShowModal}
        >
          Publicar comentario
        </LoginModal>
      ) : null }
    </QueryResult>
  );
}

export default PoliticalFigureCommentForm;
