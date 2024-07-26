/* eslint-disable max-len */

'use client';

import cx from 'classnames';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { usePoliticalFigures } from '@/api/political-figures';
import VideoModal from '@/utils/VideoModal';
import { mutateSendOTP, mutateVerifyOTP } from './api/authentication';
import Button from './components/Button';
import QueryResult from './components/QueryResult';
import PoliticalFiguresList from './features/home/PoliticalFiguresList';
import HowItWorkModal from './features/home/howItWork/HowItWorkModal';
import { bold, extraBold, regular } from './fonts';

function Home() {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [initialData, setInitialData] = useState<Api.PoliticalFigure[]>([]);
  const [hidden, setHidden] = useState(false);
  const [phone, setPhone] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const postSendOTP = mutateSendOTP();
  const postValidateOTP = mutateVerifyOTP();

  const handleSendOTP = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!phone) return;
    postSendOTP.mutate(phone);
    setHidden(true);
  };

  const handleValidateOTP = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!phone || !code) return;
    postValidateOTP.mutate({ phoneNumber: phone, code });
    setShowModal(false);
  };

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

      <div className="m-0 p-0 ">
        <button type="button" className="w-full" onClick={() => setShowModal(true)}>
          <img src="/video.jpg" alt="video-modal" className="md:w-full w-11/12" />
        </button>
        <VideoModal showModal={showModal} setShowModal={setShowModal} media="/video.jpg" />
      </div>
      <div className="flex w-full justify-center mb-10 mt-0 pt-0" style={{ backgroundImage: 'url(/bg_form.jpg)' }}>
        <div className="w-2/5  text-justify ">
          <p className={cx('text-5xl mb-10 leading-10 text-white text-center py-20 ', extraBold.className)}>
            Sé parte de
            <br />
            la comunidad
            <br />
            que opina y
            <br />
            aporta a México.
          </p>
        </div>
        <div className="w-2/5 p-20 bg-white">
          <p className={cx('text-3xl mb-10 leading-10 text-center', extraBold.className)}>Bienvenido a Facegov.</p>
          <p className="pb-3">
            ¡Bienvenidos a la primera plataforma para calificar a la clase política de nuestro país! Para comenzar solo tienes que registrarte aquí con tu número de teléfono y a continuación te enviaremos una verificación.
          </p>
          <form id="formPhone" hidden={!!hidden} onSubmit={handleSendOTP}>
            <div className="mb-4 flex flex-col gap-y-3">
              <p className="uppercase text-center">Celular</p>
              <input
                id="phone"
                name="phone"
                type="tel"
                pattern="[0-9]{10}"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-gray-900 text-sm border border-gray-950 rounded-3xl w-full py-3 text-center"
              />
            </div>
            <div className="mt-10 mb-6 grid place-items-center">
              <Button
                type="submit"
                className="py-3 w-full !px-20 rounded-3xl !bg-red-700 !hover:bg-black"
              >
                Continuar
              </Button>
            </div>
          </form>
          <form id="formValidate" hidden={!hidden} onSubmit={handleValidateOTP}>
            <div className="mb-4 flex flex-col gap-y-3">
              <p className="uppercase text-center">Codigo de verificación</p>
              <input
                id="code"
                name="code"
                placeholder="Ingresa el codigo dde verificación"
                type="text"
                pattern="[0-9]{6}"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="text-gray-900 text-sm border border-gray-950 rounded-3xl w-full py-3 text-center"
              />
            </div>
            <div className="mt-10 mb-6 grid place-items-center">
              <Button
                type="submit"
                className="py-3 w-full !px-20 rounded-3xl !bg-red-700 !hover:bg-black"
              >
                Validar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Home;
