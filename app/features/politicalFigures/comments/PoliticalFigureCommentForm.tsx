/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';

import { useIsSignedIn } from '@/api/authentication';
import { mutateComment } from '@/api/comments';
import Button from '@/components/Button';
import QueryResult from '@/components/QueryResult';
import RatingControl from '@/components/RatingControl';
import LoginModal from '@/features/login/LoginModal';

type PoliticalFigureCommentFormProps = {
  politicalFigure: Api.PoliticalFigure;
};

const MAX_COMMENT_LENGTH = 650;

function PoliticalFigureCommentForm({ politicalFigure }: PoliticalFigureCommentFormProps) {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const isSignedIn = useIsSignedIn();

  const mutate = mutateComment();

  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (politicalFigure.canUserComment === false) {
      return;
    }
    // eslint-disable-next-line no-alert
    mutate.mutate({ rating, text, politicalFigureSlug: politicalFigure.slug });
    setText('');
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= MAX_COMMENT_LENGTH) {
      setText(event.target.value);
    }
  };

  return (
    <QueryResult query={isSignedIn} isFullScreenLoader={false}>
      <form className="mb-6" onSubmit={handleCommentSubmit}>
        <div className="mb-16">
          <label htmlFor="rating" className="sr-only">Calificación:</label>
          <RatingControl rating={rating} setRating={setRating} />
        </div>
        <div className="p-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-950">
          <label htmlFor="comment" className="sr-only">
            Tú comentario
          </label>
          <textarea
            rows={6}
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
            placeholder="Escribe un comentario..."
            required
            value={text}
            onChange={handleChangeText}
          />
          <div className="text-right">
            {`${text.length} / ${MAX_COMMENT_LENGTH}`}
          </div>
        </div>
        <div className="flex justify-end mt-8">
          {(isSignedIn.data?.data?.authenticated === true && politicalFigure.canUserComment === true) ? (
            <Button
              type="submit"
              className="h-14 !px-12"
              disabled={mutate.isLoading || rating === 0}
            >
              Calificar
            </Button>
          ) : null }
          {(isSignedIn.data?.data?.authenticated === true && politicalFigure.canUserComment !== true) && (
            <div className="bg-gray-200 px-6 py-4 rounded-2xl cursor-not-allowed">Ya has calificado a este político</div>
          )}
        </div>
      </form>
      <div className="flex justify-end">
        {isSignedIn.data?.data?.authenticated === false ? (
          <LoginModal
            className="h-14 !px-12"
            showModal={showModal}
            setShowModal={setShowModal}
          >
            Calificar
          </LoginModal>
        ) : null }
      </div>
    </QueryResult>
  );
}

export default PoliticalFigureCommentForm;
