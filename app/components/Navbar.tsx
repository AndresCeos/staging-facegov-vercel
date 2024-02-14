import Link from 'next/link';
import SearchForm from './SearchForm';
import UserDropdown from './UserDropDown';

function Navbar() {
  return (
    <div className="bg-white shadow-md mb-2">
      <div className="h-14 flex items-center justify-between max-w-[1240px] mx-auto px-4">
        <div className="grow">
          <Link href="/">
            <h1 className="w-full text-3xl font-bold">Sexenio Faces</h1>
          </Link>
        </div>
        <div className="mx-10">
          <SearchForm />
        </div>
        <UserDropdown />
      </div>
    </div>
  );
}

export default Navbar;
