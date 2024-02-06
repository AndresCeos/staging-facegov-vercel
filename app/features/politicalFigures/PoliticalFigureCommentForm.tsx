/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';

import RatingControl from '@/components/RatingControl';

function PoliticalFigureCommentForm() {
  const [rating, setRating] = useState(0);

  return (
    <form className="mb-6">
      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200  ">
        <label htmlFor="comment" className="sr-only">
          Tú comentario
        </label>
        <textarea
          rows={6}
          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none  "
          placeholder="Escribe un comentario..."
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="rating" className="text-sm">Calificación:</label>
        <RatingControl rating={rating} setRating={setRating} />
      </div>
      <button
        type="submit"
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800"
      >
        Publicar comentario
      </button>
    </form>
  );
}

export default PoliticalFigureCommentForm;
