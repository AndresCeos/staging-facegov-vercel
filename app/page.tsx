'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { usePoliticalFigures } from '@/api/political-figures';
import Button from './components/Button';
import QueryResult from './components/QueryResult';
import HowItWorkModal from './features/home/HowItWork/HowItWorkModal';
import PoliticalFiguresList from './features/home/PoliticalFiguresList';

function Home() {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<Api.PoliticalFigure[]>([]);

  const politicalFigures = usePoliticalFigures({ offset: (page - 1) * 9, limit: 9 });

  useEffect(() => {
    if (politicalFigures.status === 'success') {
      const data = initialData.concat(politicalFigures.data?.results ?? []);
      setInitialData(data.filter((value, index, self) => self.findIndex((v) => v.id === value.id) === index));
    }
  }, [politicalFigures.dataUpdatedAt]);

  return (
    <main>
      <h2 className="py-20 md:py-36 text-4xl text-center max-w-96 mx-auto">El espacio para calificar políticos</h2>
      <QueryResult query={politicalFigures} isFullScreenLoader>
        <PoliticalFiguresList politicalFigures={initialData} />
        {politicalFigures.data?.pagination.hasNextPage && (
          <div className="my-20 grid place-items-center">
            <Button
              onClick={() => setPage(page + 1)}
              className="py-6 px-22 rounded-[20px]"
              disabled={politicalFigures.isLoading}
            >
              Ver otros políticos
              {politicalFigures.isLoading && '...'}
            </Button>
          </div>
        )}
      </QueryResult>
      <div className="flex flex-col-reverse md:grid md:grid-cols-2 my-20">
        <div className="grid place-items-center mt-20 md:mt-0">
          <Button
            className="py-8 px-20 rounded-3xl"
            onClick={() => setIsOpen(true)}
          >
            Cómo funciona FacesGov
          </Button>
        </div>
        <div>
          <Image
            src="/como-funciona.jpg"
            alt="Cómo funciona FacesGov"
            width={500}
            height={500}
          />
        </div>
        <HowItWorkModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </main>
  );
}

export default Home;
