/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */

'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { usePoliticalFigures } from '@/api/political-figures';
import QueryResult from './components/QueryResult';
import PoliticalFiguresList from './features/home/PoliticalFiguresList';

function Home() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);

  const politicalFigures = usePoliticalFigures({ page, limit: 9 });

  return (
    <main>
      <QueryResult query={politicalFigures} isFullScreenLoader>
        <PoliticalFiguresList politicalFigures={politicalFigures?.data?.results ?? []} />
        <div className="flex justify-center mt-8">
          <nav aria-label="Page navigation example">
            <ul className="flex items-center -space-x-px h-10 text-base">
              <li>
                <Link
                  href={{ search: `?page=${Math.max(page - 1, 1)}` }}
                  className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                  </svg>
                </Link>
              </li>
              {Array.from({ length: politicalFigures?.data?.totalPages ?? 0 }).map((_, index) => (
                <li key={index}>
                  <Link
                    href={{ search: `?page=${index + 1}` }}
                    className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700  ${politicalFigures?.data?.page === index + 1 ? 'bg-blue-50 border-blue-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700' : ''}`}
                  >
                    {index + 1}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={{ search: `?page=${Math.min(page + 1, politicalFigures?.data?.totalPages ?? 1)}` }}
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                >
                  <span className="sr-only">Next</span>
                  <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </QueryResult>

    </main>
  );
}

export default Home;
