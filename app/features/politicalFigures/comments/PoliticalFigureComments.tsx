'use client';

import { useState } from 'react';

import PoliticalFigureCommentForm from './PoliticalFigureCommentForm';
import PoliticalFigureCommentsList from './PoliticalFigureCommentsList';

type PoliticalFigureCommentsProps = {
  politicalFigure: Api.PoliticalFigure;
};

function PoliticalFigureComments({ politicalFigure }: PoliticalFigureCommentsProps) {
  const [sort, setSort] = useState('newest');
  const [sortConfig, setSortConfig] = useState<Pagination.SortConfig>({ key: 'createdAt', direction: 'desc' });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    switch (e.target.value) {
      case 'newest':
        setSortConfig({ key: 'createdAt', direction: 'desc' });
        break;
      case 'oldest':
        setSortConfig({ key: 'createdAt', direction: 'asc' });
        break;
      case 'highest':
        setSortConfig({ key: 'utility', direction: 'desc' });
        break;
      case 'lowest':
        setSortConfig({ key: 'utility', direction: 'asc' });
        break;
      default:
        break;
    }
  };

  return (
    <div className="shadow-md rounded-lg overflow-hidden col-span-2">
      <section className="bg-white py-8 antialiased">
        <div className="mx-auto px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">Comentarios</h2>
          </div>
          <PoliticalFigureCommentForm politicalFigure={politicalFigure} />
          <PoliticalFigureCommentsList
            politicalFigure={politicalFigure}
            sortConfig={sortConfig}
          />
          <div className="flex justify-end">
            <select value={sort} onChange={handleSortChange}>
              <option value="newest">Más recientes</option>
              <option value="oldest">Más antiguos</option>
              <option value="highest">Más útiles</option>
              <option value="lowest">Menos útiles</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PoliticalFigureComments;
