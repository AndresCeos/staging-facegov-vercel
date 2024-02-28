'use client';

import { useState } from 'react';

import { mutateUserProfile } from '@/api/users';
import Button from '@/components/Button';

type ProfileUpdateFormProps = {
  initialUserInformation: {
    firstName: string;
    lastName: string;
  };
};

function ProfileUpdateForm({ initialUserInformation }: ProfileUpdateFormProps) {
  const [userInformation, setUserInformation] = useState(initialUserInformation);

  const mutate = mutateUserProfile();

  const handleSendUserInformation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate.mutate(userInformation);
  };

  return (
    <form onSubmit={handleSendUserInformation}>
      <div className="mb-4 flex flex-col gap-y-3">
        <label htmlFor="firstName" className="uppercase text-center">
          Tu Nombre
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={userInformation.firstName}
            onChange={(e) => setUserInformation({ ...userInformation, firstName: e.target.value })}
            className="text-gray-900 text-sm border border-gray-950 rounded-3xl w-full py-3 text-center"
          />
        </label>
      </div>
      <div className="mb-4 flex flex-col gap-y-3">
        <label htmlFor="lastName" className="uppercase text-center">
          Tu Apellido
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={userInformation.lastName}
            onChange={(e) => setUserInformation({ ...userInformation, lastName: e.target.value })}
            className="text-gray-900 text-sm border border-gray-950 rounded-3xl w-full py-3 text-center"
          />
        </label>
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
  );
}

export default ProfileUpdateForm;
