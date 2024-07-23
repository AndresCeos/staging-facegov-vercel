/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import cx from 'classnames';
import { PropsWithChildren, useState } from 'react';

import { MdClose } from 'react-icons/md';

import { mutateSendOTP, mutateVerifyOTP } from '@/api/authentication';
import Button from '@/components/Button';

type LoginModalProps = {
  className?: string;
  showModal: boolean;
  setShowModal: (state: boolean) => void;
} & PropsWithChildren<unknown>;

function LoginModal({
  showModal, setShowModal, children, className = '',
}: LoginModalProps) {
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

  return (
    <>
      <Button
        className={cx(className)}
        onClick={() => setShowModal(true)}
      >
        {children}
      </Button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/* content */}
              <div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* header */}
                <div className="flex items-start justify-between p-5 rounded-t gap-10">
                  <button
                    type="button"
                    className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-gray-400 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <MdClose />
                      <span className="sr-only">Close</span>
                    </span>
                  </button>
                </div>
                {/* body */}
                <div className="relative p-6 flex-auto w-full max-w-[34rem] px-16">
                  <h1 className="w-full text-3xl font-light text-center">FACESGOV</h1>
                  <p className="text-gray-500 my-9 mb-4 text-center">¡Bienvenidos a la primera plataforma para calificar a la clase política de nuestro país! Para comenzar solo tienes que registrarte aquí con tu número de teléfono y a continuación te enviaremos una verificación.</p>
                  <form id="formPhone" hidden={!!hidden} onSubmit={handleSendOTP}>
                    <div className="mb-4 flex flex-col gap-y-3">
                      <label htmlFor="phone" className="uppercase text-center">Celular</label>
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
                        className="py-6 !px-20 rounded-3xl"
                      >
                        Continuar
                      </Button>
                    </div>
                  </form>
                  <form id="formValidate" hidden={!hidden} onSubmit={handleValidateOTP}>
                    <div className="mb-4 flex flex-col gap-y-3">
                      <label htmlFor="code" className="uppercase text-center">Codigo de verificación</label>
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
                        className="py-6 !px-20 rounded-3xl"
                      >
                        Validar
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </>
  );
}

export default LoginModal;
