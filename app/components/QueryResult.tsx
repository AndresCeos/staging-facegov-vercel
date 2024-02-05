import { ReactNode } from 'react';
import { UseQueryResult } from 'react-query';
import Loader from './Loader';

type QueryResultProps = {
  children: ReactNode;
  query: UseQueryResult;
  isFullScreenLoader?: boolean;
};

function QueryResult({ children, query, isFullScreenLoader = false }: QueryResultProps) {
  const {
    isLoading, isError, error, isSuccess,
  } = query;

  if (isError) {
    return (
      <div className="flex items-center justify-center h-32">
        <span className="text-xl text-gray-500 dark:text-gray-400">
          {(error as never as any)?.message}
        </span>
      </div>
    );
  }

  if (isLoading && isFullScreenLoader) {
    return <Loader isFullHeight />;
  }

  if (isSuccess) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  return <Loader />;
}

QueryResult.defaultProps = {
  isFullScreenLoader: false,
};

export default QueryResult;
