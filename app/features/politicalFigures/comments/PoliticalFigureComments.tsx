'use client';

import { useState } from 'react';

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
    <div className="max-w-3xl my-20 mx-auto">
      <section className="bg-white py-8 antialiased">
        <div className="mx-auto px-8">
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
