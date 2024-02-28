'use client';

import Link from 'next/link';

import { HiBars4 } from 'react-icons/hi2';

import Button from './Button';
import SearchForm from './SearchForm';
import UserDropdown from './UserDropDown';

function Navbar() {
  return (
    <header className="bg-white mb-2">
      <div className="h-20 flex items-center justify-between max-w-[1240px] mx-auto px-4">
        <div className="">
          <Link href="/">
            <h1 className="w-full text-3xl">FACESGOV</h1>
          </Link>
        </div>
        <div className="hidden md:flex grow items-center gap-10 justify-end">
          <Link className="text-sm text-gray-500 hover:text-gray-700" href="/tendencias">Tendencias</Link>
          <Link className="text-sm text-gray-500 hover:text-gray-700" href="/contacto">Contacto</Link>
          <SearchForm />
          <Button
            onClick={() => console.log('Registro')}
            className="uppercase"
          >
            Registro
          </Button>
          <Button
            onClick={() => console.log('Calificar')}
            className="uppercase"
          >
            Calificar
          </Button>

          <UserDropdown />
        </div>
        <div className="grid place-items-center md:hidden">
          <button
            type="button"
            onClick={() => console.log('Menu')}
          >
            <span className="sr-only">Menú</span>
            <HiBars4 className="text-3xl" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
