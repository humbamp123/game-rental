'use client';

import PacmanLoader from "react-spinners/PacmanLoader";
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { generatePagination } from '@/lib/utils/pagination';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const queryLimit = 20;
  const currentPage = Math.ceil(Number(searchParams.get('offset')) / queryLimit) + 1

  const [loading, setLoading] = useState(false);
  const params = new URLSearchParams(searchParams);
  const pathName = `${pathname}?${params.toString()}`
  useEffect(() => setLoading(false), [pathName]);

  function handleClick(pageNumber: number | string) {
    setLoading(true)
    const offset = (queryLimit * (pageNumber - 1)).toString()
    params.set('offset', offset);
    push(`${pathname}?${params.toString()}`, { scroll: true });
  }
  const allPages = totalPages ? generatePagination(currentPage, totalPages) : null

  if (!allPages) {
    return (<div />)
  } else if (loading) {
    return (
      <div className="flex h-[56px] justify-center py-2">
        <PacmanLoader
          color={'#475569'}
          size={16}
          loading={loading} />
      </div>
    )
  } else {
    return (
      <div className="flex justify-center py-2">
        <PaginationArrow
          direction="left"
          onClick={() => handleClick(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="flex space-x-px">
          {
            allPages.map((page, index) => {
              let position: 'first' | 'last' | 'single' | 'middle' | undefined;

              if (index === 0) position = 'first';
              if (index === allPages.length - 1) position = 'last';
              if (allPages.length === 1) position = 'single';
              if (page === '...') position = 'middle';
              return (
                < PaginationNumber
                  key={page + index}
                  onClick={() => handleClick(page)}
                  page={page}
                  position={position}
                  isActive={currentPage === page}
                />
              );
            })}
        </div>

        <PaginationArrow
          direction="right"
          onClick={() => handleClick(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    );
  }
}

function PaginationNumber({
  page,
  onClick,
  isActive,
  position,
}) {

  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm border',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-slate-600 border-slate-600 text-white': isActive,
      'hover:bg-gray-100': !isActive && position !== 'middle',
      'text-gray-300': position === 'middle',
    },
  );
  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <button className={className} onClick={onClick}>
      {page}
    </button>
  );
}

function PaginationArrow({
  onClick,
  direction,
  isDisabled,
}) {

  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-gray-100': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    },
  );

  const icon =
    direction === 'left' ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div
      key={direction}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : undefined}
      className={className}>{icon}</div>
  ) : (
      <button className={className} onClick={onClick}>
        {icon}
      </button>
  );
}
