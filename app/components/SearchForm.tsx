/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

function SearchForm() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch('');
    router.push(`/search/?s=${search.trim()}`);
  };

  return (
    <form className="border border-gray-950 rounded-full" onSubmit={handleSubmit}>
      <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input
          type="text"
          id="search"
          className="block w-full min-w-72  py-2 px-4 ps-10 text-sm text-gray-900 rounded-full focus:ring-0 focus:border-0 focus:outline-none"
          placeholder="Búsqueda de personajes"
          required
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </form>

  );
}

export default SearchForm;
