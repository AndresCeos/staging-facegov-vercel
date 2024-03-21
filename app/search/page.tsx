'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { HiXCircle } from 'react-icons/hi';

import { usePoliticalFigures } from '@/api/political-figures';
import Button from '@/components/Button';
import QueryResult from '@/components/QueryResult';
import PoliticalFiguresList from '@/features/home/PoliticalFiguresList';

function SearchPage() {
  const [page, setPage] = useState(1);
  const [initialData, setInitialData] = useState<Api.PoliticalFigure[]>([]);
  const [search, setSearch] = useState('' as string);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('s') || '';

  const politicalFigures = usePoliticalFigures({ offset: (page - 1) * 9, limit: 9, search: searchQuery });

  useEffect(() => {
    if (politicalFigures.status === 'success') {
      const data = (search !== searchQuery ? [] : initialData).concat(politicalFigures.data?.results ?? []);
      setInitialData(data.filter((value, index, self) => self.findIndex((v) => v.id === value.id) === index));
    }
    setSearch(searchQuery.toString());
  }, [politicalFigures.dataUpdatedAt, searchQuery, search]);

  return (
    <main>
      <div className="flex gap-1 my-10 items-center">
        <h2 className="text-2xl">
          {'Búsqueda: '}
          <strong>{searchQuery}</strong>
        </h2>
        <Link href="/" className="underline text-gray-950 hover:text-gray-500">
          <span className="sr-only">Limpiar</span>
          <HiXCircle className="w-6 h-6" />
        </Link>
      </div>
      <QueryResult query={politicalFigures} isFullScreenLoader>
        <PoliticalFiguresList politicalFigures={initialData} />
        {politicalFigures.data?.pagination.hasNextPage && (
          <div className="my-20 grid place-items-center">
            <Button
              onClick={() => setPage(page + 1)}
              className="py-6 px-22 rounded-[20px]"
              disabled={politicalFigures.isLoading}
            >
              Ver más políticos
              {politicalFigures.isLoading && '...'}
            </Button>
          </div>
        )}
      </QueryResult>
    </main>
  );
}

export default SearchPage;
