/* eslint-disable max-len */

'use client';

import cx from 'classnames';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { usePoliticalFigures } from '@/api/political-figures';

import Button from './components/Button';
import QueryResult from './components/QueryResult';
import FormHome from './features/home/FormHome';
import PoliticalFiguresList from './features/home/PoliticalFiguresList';
import VideoModalHome from './features/home/VideoModalHome';
import HowItWorkModal from './features/home/howItWork/HowItWorkModal';
import { bold, extraBold, regular } from './fonts';

function Home() {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<Api.PoliticalFigure[]>([]);

  const politicalFigures = usePoliticalFigures({ offset: (page - 1) * 8, limit: 8 });

  useEffect(() => {
    const body = document.querySelector('body');
    setTimeout(() => {
      body?.scrollIntoView();
    }, 200);
  }, []);

  useEffect(() => {
    if (politicalFigures.status === 'success') {
      const data = initialData.concat(politicalFigures.data?.results ?? []);
      setInitialData(data.filter((value, index, self) => self.findIndex((v) => v.id === value.id) === index));
    }
  }, [politicalFigures.dataUpdatedAt]);

  return (
    <main>
      <div>
        <h2
          className={cx(
            'py-20 md:py-36 text-3xl tracking-tighter leading-8 text-center mx-auto',
            bold.className,
          )}
        >
          Bienvenido a la única red social para la
          <br />
          participación ciudadana dentro de la política.
        </h2>
        <QueryResult query={politicalFigures} isFullScreenLoader={false}>
          <PoliticalFiguresList politicalFigures={initialData} />
          {politicalFigures.data?.pagination.hasNextPage && (
          <div className="my-20 grid place-items-center">
            <Button
              onClick={() => setPage(page + 1)}
              className="py-4 px-22 rounded-[20px] bg-green hover:bg-black"
              disabled={politicalFigures.isLoading}
            >
              Ver otros políticos
              {politicalFigures.isLoading && '...'}
            </Button>
          </div>
          )}
        </QueryResult>
        <div className="flex flex-col-reverse md:grid md:grid-cols-2 my-20 items-center">
          <div className="place-items-center mt-20 md:mt-0">
            <p className={cx('text-5xl mb-10 leading-10', extraBold.className)}>
              Conócelos,
              <br />
              califica y opina.
            </p>
            <p className={cx('text-base leading-6 mb-10', regular.className)}>
              Encuentra a un politico, y calificalo con hasta
              <br />
              cinco estrellas. Expresa tú opinión sobre el
              <br />
              desempeño de ellos, escribe comentarios
              <br />
              detallados y proporciona retroalimentación
              <br />
              sobre su trabajo y cumplimiento de sus promesas
              <br />
              de campaña.
            </p>
            <Button
              className={cx(' text-base leading-6 mb-10 bg-green-h', bold.className)}
              onClick={() => setIsOpen(true)}
            >
              ¿Cómo funciona?
            </Button>
          </div>
          <div>
            <Image
              src="/Collage_Facegov.jpg"
              alt="Cómo funciona FacesGov"
              width={500}
              height={500}
            />
          </div>
          <HowItWorkModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
      <VideoModalHome />
      <FormHome />
    </main>
  );
}

export default Home;
