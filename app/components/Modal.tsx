/* eslint-disable max-len */
import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';
import Button from './Button';

type ModalProps = {
  title: string;
  message: string;
  button: string
  type: string;
  closeModal: () => void;
};

function Modal({
  title, message, type, button, closeModal,
}: ModalProps) {
  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/* content */}
          <div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* body */}
            <div className="relative p-6 flex-auto w-full max-w-[34rem] px-16">
              <h1 className="w-full text-2xl font-light text-center">{title}</h1>
              <div className="flex flex-col justify-center">
                <div className="mb-4 flex flex-col p-6 justify-center items-center">
                  {type === 'error' ? <HiExclamationCircle className="text-6xl text-red-500" /> : <HiCheckCircle className="text-6xl text-green-500" />}
                  <p className="text-center">{message}</p>
                  <Button
                    className="mt-4"
                    onClick={closeModal}
                  >
                    {button}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    </>
  );
}

export default Modal;
