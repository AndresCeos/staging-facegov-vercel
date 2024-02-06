/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import { useState } from 'react';

import mutateUserProfile from '@/api/users';

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
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                Completa tu perfil
              </h3>
            </div>
            <div className="relative p-6 flex-auto">
              <form onSubmit={handleSendUserInformation}>
                <div className="mb-4 flex flex-col gap-y-3">
                  <label htmlFor="firstName">Tu Nombre</label>
                  <input
                    id="firstName"
                    name="firstName"
                    placeholder="Ingresa tu nombre"
                    type="text"
                    value={userInformation.firstName}
                    onChange={(e) => setUserInformation({ ...userInformation, firstName: e.target.value })}
                    className="text-gray-900 text-sm bg-gray-50 border border-gray-300 rounded-md shadow-sm w-full py-2 px-3 sm:text-sm"
                  />
                </div>
                <div className="mb-4 flex flex-col gap-y-3">
                  <label htmlFor="lastName">Tu Apellido</label>
                  <input
                    id="lastName"
                    name="lastName"
                    placeholder="Ingresa tu apellido"
                    type="text"
                    value={userInformation.lastName}
                    onChange={(e) => setUserInformation({ ...userInformation, lastName: e.target.value })}
                    className="text-gray-900 text-sm bg-gray-50 border border-gray-300 rounded-md shadow-sm w-full py-2 px-3 sm:text-sm"
                  />
                </div>

                <div className="mb-6">
                  <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800"
                    disabled={mutate.isLoading}
                  >
                    Continuar
                  </button>
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
