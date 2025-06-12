'use client';

import '../../../globals.css';

interface PoliticalFigureInfo {
  firstName: string;
  lastName: string;
  slug: string;
  rating: number;
}

function PoliticalFigureCard({ figure }: { figure: PoliticalFigureInfo }) {
  const { rating } = figure;
  const ratingToNumber = Number(rating);
  return (
    <div className="ticker-card">
      <div className="ticker-symbol">
        <a href={`/politico/${figure.slug}`} target="self" rel="noopener noreferrer">
          {`${figure.firstName} ${figure.lastName}`}
        </a>
      </div>
      <div className="">
        {ratingToNumber <= 3 ? (
          <span className="ticker-rating negative">
            <span>&#9660; </span>
            {figure.rating}
          </span>
        ) : (
          <span className="ticker-rating positive">
            <span>&#9650; </span>
            {figure.rating}
          </span>
        )}
      </div>
    </div>
  );
}

export default PoliticalFigureCard;
