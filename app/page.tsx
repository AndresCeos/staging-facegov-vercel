'use client';

import usePoliticalFigures from './api/political-figures';
import QueryResult from './components/QueryResult';
import PoliticalFiguresList from './features/home/PoliticalFiguresList';

function Home() {
  const politicalFigures = usePoliticalFigures();
  return (
    <main>
      <QueryResult query={politicalFigures}>
        <PoliticalFiguresList politicalFigures={politicalFigures?.data?.results ?? []} />
      </QueryResult>
    </main>
  );
}

export default Home;
