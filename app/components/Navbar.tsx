'use client';

import Link from 'next/link';

function Navbar() {
  return (
    <div className="bg-white shadow-md mb-2">
      <div className="h-14 flex items-center justify-between max-w-[1240px] mx-auto px-4">
        <Link href="/">
          <h1 className="w-full text-3xl font-bold">Sexenio Faces</h1>
        </Link>
        <span>user</span>
      </div>
    </div>
  );
}

export default Navbar;
