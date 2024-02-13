import { SortConfig, usePoliticalFigureComments } from '@/api/political-figures';
import QueryResult from '@/components/QueryResult';
import PoliticalFigureCommentsListItem from './PoliticalFigureCommentsListItem';

type PoliticalFigureCommentsListProps = {
  politicalFigure: Api.PoliticalFigure;
  sortConfig: SortConfig;
};

function PoliticalFigureCommentsList({ politicalFigure, sortConfig }: PoliticalFigureCommentsListProps) {
  const comments = usePoliticalFigureComments(politicalFigure.id, sortConfig);

  return (
    <QueryResult query={comments} isFullScreenLoader={false}>
      {comments?.data?.results?.map((comment) => (
        <PoliticalFigureCommentsListItem
          politicalFigureId={politicalFigure.id}
          comment={comment}
          key={comment.id}
        />
      ))}
    </QueryResult>
  );
}

export default PoliticalFigureCommentsList;
