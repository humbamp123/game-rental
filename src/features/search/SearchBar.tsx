'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import PacmanLoader from "react-spinners/PacmanLoader";
import { useDebouncedCallback } from 'use-debounce';
import { useEffect, useState } from 'react';

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const [loading, setLoading] = useState(false);
  const params = new URLSearchParams(searchParams);
  const pathName = `${pathname}?${params.toString()}`
  useEffect(() => setLoading(false), [pathName]);

  const handleSearch = useDebouncedCallback((searchInput) => {
    setLoading(true);
    if (searchInput) {
      params.set('filter', 'name:' + searchInput);
      params.delete('offset');
    } else {
      params.delete('filter');
    }
    push(`${pathname}?${params.toString()}`);
  }, 300);

  const searchParamValue = searchParams.get('filter')?.toString()

  return (
    <div className='w-full'>
      <div className='flex pl-3 p-3 w-full rounded-full z-20  bg-slate-600'>
        <div className='p-2'>
          <MagnifyingGlassIcon className='w-4 stroke-white' />
        </div>
        <input
          id="search"
          name="search"
          type="search"
          className="peer block w-3/4 rounded-full border border-slate-200 px-4 text-sm outline-2 placeholder:text-slate-500 grow"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParamValue?.substring(searchParamValue.indexOf(":") + 1)}
        />
        <div className='px-4 w-[64px]'>
          <PacmanLoader
            color={'#ffffff'}
            size={16}
            loading={loading} />
        </div>
      </div>
    </div>
  )
}
