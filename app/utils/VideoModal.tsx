/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import cx from 'classnames';
import { PropsWithChildren } from 'react';

import { MdClose } from 'react-icons/md';

type VideoModalProps = {
  className?: string;
  showModal: boolean;
  setShowModal: (state: boolean) => void;
  media?: string;
} & PropsWithChildren<unknown>;

function VideoModal({
  showModal, setShowModal, children, className = '', media,
}: VideoModalProps) {
  return (
    <>
      <button
        type="button"
        className={cx(className)}
        onClick={() => setShowModal(true)}
      >
        {children}
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/* content */}
              <div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* header */}
                <div className="flex items-start justify-between p-5 rounded-t ">
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
                  <iframe width="400" height="400" src={media} title="video" />
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

export default VideoModal;
