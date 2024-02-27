/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import { useState } from 'react';

import mutateUserProfile from '@/api/users';
import Button from '@/components/Button';

type ProfileModalProps = {
  initialUserInformation: {
    firstName: string;
    lastName: string;
  };
};

function ProfileModal({ initialUserInformation }: ProfileModalProps) {
  const [userInformation, setUserInformation] = useState(initialUserInformation);

  const mutate = mutateUserProfile();

  const handleSendUserInformation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate.mutate(userInformation);
  };

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
              <h1 className="w-full text-3xl font-light text-center">FACESGOV</h1>
              <p className="text-gray-500 my-9 mb-4 text-center">Aenean consectetur odio in condimentum tristique. Nam hendrerit urna ex, non pretium erat pellentesque eget. Sed ut risus nec augue sagittis convallis.</p>
              <form onSubmit={handleSendUserInformation}>
                <div className="mb-4 flex flex-col gap-y-3">
                  <label htmlFor="firstName" className="uppercase text-center">Tu Nombre</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={userInformation.firstName}
                    onChange={(e) => setUserInformation({ ...userInformation, firstName: e.target.value })}
                    className="text-gray-900 text-sm border border-gray-950 rounded-3xl w-full py-3 text-center"
                  />
                </div>
                <div className="mb-4 flex flex-col gap-y-3">
                  <label htmlFor="lastName" className="uppercase text-center">Tu Apellido</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={userInformation.lastName}
                    onChange={(e) => setUserInformation({ ...userInformation, lastName: e.target.value })}
                    className="text-gray-900 text-sm border border-gray-950 rounded-3xl w-full py-3 text-center"
                  />
                </div>
                <div className="mt-10 mb-6 grid place-items-center">
                  <Button
                    type="submit"
                    className="py-6 !px-20 rounded-3xl"
                    disabled={mutate.isLoading}
                  >
                    Continuar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    </>
  );
}

export default ProfileModal;
