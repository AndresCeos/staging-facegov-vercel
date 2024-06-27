'use client';

import cx from 'classnames';

import Link from 'next/link';

import { HiBars4 } from 'react-icons/hi2';

import { useState } from 'react';
import { HiX } from 'react-icons/hi';
import Button from './Button';
import SearchForm from './SearchForm';
import UserDropdown from './UserDropDown';
import LoginModal from '@/features/login/LoginModal';

import { useIsSignedIn } from '@/api/authentication';

import { bold, regular } from '@/fonts';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isSignedIn = useIsSignedIn();

  return (
    <>
      <header className="bg-white mb-2">
        <div className="h-20 flex items-center justify-between max-w-[1240px] mx-auto px-4">
          <div className="">
            <Link href="/">
              <h1 className="w-full text-3xl">FACESGOV</h1>
            </Link>
          </div>
          <div className="hidden lg:flex grow items-center gap-10 justify-end">
            <Link
              className={cx(
                'text-base text-gray-500 hover:text-gray-700',
                regular.className,
              )}
              href="/candidatos"
            >
              Candidatos
            </Link>
            <Link
              className={cx(
                'text-base text-gray-500 hover:text-gray-700',
                regular.className,
              )}
              href="/tendencias"
            >
              Tendencias
            </Link>
            <Link
              className={cx(
                'text-base text-gray-500 hover:text-gray-700',
                regular.className,
              )}
              href="/contacto"
            >
              Contacto
            </Link>
            <SearchForm />

            <Button
              onClick={() => console.log('Calificar')}
              className={cx('text-lg', bold.className)}
            >
              Calificar
            </Button>

            {(!isSignedIn.data?.data?.authenticated || isSignedIn.isLoading) && (

            <LoginModal
              showModal={showModal}
              setShowModal={setShowModal}
              className={cx('text-lg bg-green', bold.className)}
            >
              Registro
            </LoginModal>
            ) }

            <UserDropdown />
          </div>
          <div className="grid place-items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Menú</span>
              <HiBars4 className="text-3xl" />
            </button>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <div className="fixed z-50 top-0 left-0 right-0">
          <nav className="w-full h-screen bg-white bg-opacity-90 p-10 flex flex-col justify-center items-center">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Cerrar</span>
              <HiX className="text-3xl" />
            </button>
            <ul className="">
              <li className="p-4">
                <Link onClick={() => setIsMenuOpen(!isMenuOpen)} href="/">Inicio</Link>
              </li>
              <li className="p-4">
                <Link onClick={() => setIsMenuOpen(!isMenuOpen)} href="/candidatos">Candidatos</Link>
              </li>
              <li className="p-4">
                <Link onClick={() => setIsMenuOpen(!isMenuOpen)} href="/tendencias">Tendencias</Link>
              </li>
              <li className="p-4">
                <Link onClick={() => setIsMenuOpen(!isMenuOpen)} href="/contacto">Contacto</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default Navbar;
