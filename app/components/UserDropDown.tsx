/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

/* eslint-disable max-len */

import Link from 'next/link';
import { useState } from 'react';

import { mutateLogout, useIsSignedIn } from '@/api/authentication';
import LoginModal from '@/features/login/LoginModal';
import ProfileSetupModal from '@/features/profile/modal/ProfileSetupModal';
import profileAcronym from '@/utils/profileAcronym';

function UserDropdown() {
  const isSignedIn = useIsSignedIn();
  const mutateL = mutateLogout();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    mutateL.mutateAsync({}).then(() => {
      window.location.reload();
    });
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  if (!isSignedIn.data?.data?.authenticated || isSignedIn.isLoading) {
    return null;
  }

  if (!isSignedIn.data?.data?.authenticated || isSignedIn.isLoading) {
    return (
      <LoginModal
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <div>
          <div
            className="inline-flex justify-center w-full rounded-full border border-gray-300 hover:border-blue-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 overflow-hidden"
          >
            <img src="https://placehold.co/80?text=S" alt="profile" className="w-8 h-8" />
          </div>
        </div>
      </LoginModal>
    );
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 overflow-hidden"
          onClick={handleToggle}
        >
          <img src={`https://placehold.co/80?text=${profileAcronym(isSignedIn.data?.data?.user?.firstName, isSignedIn.data?.data?.user?.lastName)}`} alt="profile" className="w-8 h-8" />
        </button>
      </div>

      {isSignedIn.data?.data?.authenticated === true && (isSignedIn.data?.data?.user?.firstName === null || isSignedIn.data?.data?.user?.lastName === null) ? (
        <ProfileSetupModal
          initialUserInformation={{
            firstName: isSignedIn.data?.data?.user?.firstName ?? '',
            lastName: isSignedIn.data?.data?.user?.lastName ?? '',
          }}
        />
      ) : null }

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
              role="menuitem"
            >
              <small className="font-bold">Perfil:</small>
              <br />
              {`${isSignedIn.data?.data?.user?.firstName} ${isSignedIn.data?.data?.user?.lastName}`}
            </div>
            <hr />
            <div
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
              role="menuitem"
            >
              <Link href="/perfil">
                Perfil
              </Link>
            </div>
            <hr />
            <div
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
              role="menuitem"
              onClick={handleLogout}
            >
              Cerrar sesión
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
