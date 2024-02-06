'use client';

import PoliticalFigureCommentForm from './PoliticalFigureCommentForm';
import PoliticalFigureCommentsList from './PoliticalFigureCommentsList';

type PoliticalFigureCommentsProps = {
  politicalFigureId: string;
};

function PoliticalFigureComments({ politicalFigureId }: PoliticalFigureCommentsProps) {
  return (
    <div className="shadow-md rounded-lg overflow-hidden col-span-2">
      <section className="bg-white py-8 antialiased">
        <div className="mx-auto px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">Comentarios</h2>
          </div>
          <PoliticalFigureCommentForm />
          <PoliticalFigureCommentsList politicalFigureId={politicalFigureId} />
        </div>
      </section>
    </div>
  );
}

export default PoliticalFigureComments;
