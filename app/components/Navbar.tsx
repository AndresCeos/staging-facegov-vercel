import Link from 'next/link';
import UserDropdown from './UserDropDown';

function Navbar() {
  return (
    <div className="bg-white shadow-md mb-2">
      <div className="h-14 flex items-center justify-between max-w-[1240px] mx-auto px-4">
        <Link href="/">
          <h1 className="w-full text-3xl font-bold">Sexenio Faces</h1>
        </Link>
        <UserDropdown />
      </div>
    </div>
  );
}

export default Navbar;
