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
  showModal, setShowModal, children, className,
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
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* header */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t gap-10">
                  <h3 className="text-3xl font-semibold">
                    Inicio de Sesión
                  </h3>
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
                <div className="relative p-6 flex-auto">
                  <form id="formPhone" hidden={!!hidden} onSubmit={handleSendOTP}>
                    <div className="mb-4 flex flex-col gap-y-3">
                      <label htmlFor="telefono">Tu Télefono</label>
                      <input
                        id="telefono"
                        name="telefono"
                        placeholder="Ingresa tu numero de teléfono"
                        type="tel"
                        pattern="[0-9]{10}"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="text-gray-900 text-sm bg-gray-50 border border-gray-300 rounded-md shadow-sm w-full py-2 px-3 sm:text-sm"
                      />
                    </div>

                    <div className="mb-6">
                      <button
                        type="submit"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800"
                      >
                        Continuar
                      </button>
                    </div>
                  </form>
                  <form id="formValidate" hidden={!hidden} onSubmit={handleValidateOTP}>
                    <div className="mb-4 flex flex-col gap-y-3">
                      <label htmlFor="code">Codigo de verificación</label>
                      <input
                        id="code"
                        name="code"
                        placeholder="Ingresa el codigo dde verificación"
                        type="text"
                        pattern="[0-9]{6}"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="text-gray-900 text-sm bg-gray-50 border border-gray-300 rounded-md shadow-sm w-full py-2 px-3 sm:text-sm"
                      />
                    </div>

                    <div className="mb-6">
                      <button
                        type="submit"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800"
                      >
                        Validar
                      </button>
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

LoginModal.defaultProps = {
  className: '',
};

export default LoginModal;
