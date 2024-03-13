
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import cx from 'classnames';
import { PropsWithChildren, useState } from 'react';

import { MdClose } from 'react-icons/md';

import Button from '@/components/Button';

type RightOfReplyModalProps = {
  className?: string;
  showModal: boolean;
  setShowModal: (state: boolean) => void;
  politicalFigureName?: string;
} & PropsWithChildren<unknown>;

function RightOfReplyModal({
  showModal, setShowModal, children, className = '', politicalFigureName='',
}: RightOfReplyModalProps) {
  const [hidden, setHidden] = useState(false);
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');



  const handleSendOTP = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!phone) return;
    if (!email) return;
    //todo: send data : {phone, email, politicalFigureName}
    console.log({ phone, email, politicalFigureName });
    setHidden(true);
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
                  <p className="text-gray-500 my-9 mb-4 text-center">Aenean consectetur odio in condimentum tristique. Nam hendrerit urna ex</p>
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
                        required
                      />
                    </div>
                    <div className=' mb-4 flex flex-col gap-y-3'>
                        <label htmlFor="email" className='uppercase text-center'>Correo Eléctronico</label>
                        <input type="email"
                        id='email'
                        name='email'
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        className='text-gray-900 text-sm border border-gray-950 rounded-3xl w-full py-3 text-center'
                        required
                        />
                    </div>
                    <div className="mt-10 mb-6 grid place-items-center">
                      <Button
                        type="submit"
                        className="py-6 !px-20 rounded-3xl"
                      >
                        Enviar
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

export default RightOfReplyModal;
