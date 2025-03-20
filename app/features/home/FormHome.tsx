/* eslint-disable max-len */
import cx from 'classnames';
import { useState } from 'react';

import { mutateSendOTP, mutateVerifyOTP, useIsSignedIn } from '@/api/authentication';
import Button from '@/components/Button';

import { extraBold } from '../../fonts';

function FormHome() {
  const [hidden, setHidden] = useState(false);
  const [phone, setPhone] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const isSignedIn = useIsSignedIn();

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
    setHidden(false);
  };

  return (
    <div className=" w-full mb-10 mt-0 pt-0 justify-center flex flex-col-reverse md:flex-row lg:flex-row" style={{ backgroundImage: 'url(/bg_form.jpg)' }}>
      <div className="md:w-2/5  text-justify ">
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
      <div className=" py-10 bg-white md:w-2/5 md:p-20">
        <p className={cx('text-3xl mb-10 leading-10 text-center', extraBold.className)}>Bienvenido a Facegov.</p>
        <p className="pb-3">
          ¡Bienvenidos a la primera plataforma para calificar a la clase política de nuestro país! Para comenzar solo tienes que registrarte aquí con tu número de teléfono y a continuación te enviaremos una verificación.
        </p>
        {(!isSignedIn.data?.data?.authenticated || isSignedIn.isLoading) && (
          <div>
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
                  className="py-3 w-full !px-20 rounded-3xl !bg-[#eab307] !hover:bg-black"
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
                  className="py-3 w-full !px-20 rounded-3xl !bg-[#eab307] !hover:bg-black"
                >
                  Validar
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>

  );
}

export default FormHome;
