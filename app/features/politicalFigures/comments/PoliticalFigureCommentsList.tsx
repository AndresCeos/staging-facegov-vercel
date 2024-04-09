import { usePoliticalFigureComments } from '@/api/political-figures';
import QueryResult from '@/components/QueryResult';
import PoliticalFigureCommentsListItem from './PoliticalFigureCommentsListItem';

type PoliticalFigureCommentsListProps = {
  politicalFigure: Api.PoliticalFigure;
  sortConfig: Pagination.SortConfig;
};

function PoliticalFigureCommentsList({ politicalFigure, sortConfig }: PoliticalFigureCommentsListProps) {
  const comments = usePoliticalFigureComments(politicalFigure.slug, sortConfig);

  return (
    <QueryResult query={comments} isFullScreenLoader={false}>
      {comments?.data?.results?.map((comment) => (
        <PoliticalFigureCommentsListItem
          politicalFigureSlug={politicalFigure.slug}
          comment={comment}
          key={comment.id}
        />
      ))}
    </QueryResult>
  );
}

export default PoliticalFigureCommentsList;
