'use client';

import Link from 'next/link';
import Button from './Button';
import SearchForm from './SearchForm';
import UserDropdown from './UserDropDown';

function Navbar() {
  return (
    <header className="bg-white mb-2">
      <div className="h-20 flex items-center justify-between max-w-[1240px] mx-auto px-4">
        <div className="">
          <Link href="/">
            <h1 className="w-full text-3xl font-light">FACESGOV</h1>
          </Link>
        </div>
        <div className="grow flex items-center gap-10 justify-end">
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
        </div>
        <UserDropdown />
      </div>
    </header>
  );
}

export default Navbar;
