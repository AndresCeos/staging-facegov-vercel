import { usePoliticalFigures } from '@/api/political-figures';
import QueryResult from '@/components/QueryResult';
import PoliticalFiguresList from '../home/PoliticalFiguresList';

function PoliticalFigureRelatedList({ politicalFigureId } : { politicalFigureId: number }) {
  const politicalFigures = usePoliticalFigures();

  const politicalFiguresList = (politicalFigures?.data?.results ?? []).filter((politicalFigure) => politicalFigure.id !== politicalFigureId);

  const politicalFiguresRandom = politicalFiguresList.sort(() => Math.random() - 0.5).slice(0, 4);

  return (
    <QueryResult query={politicalFigures} isFullScreenLoader={false}>
      <PoliticalFiguresList politicalFigures={politicalFiguresRandom ?? []} />
    </QueryResult>
  );
}

export default PoliticalFigureRelatedList;
