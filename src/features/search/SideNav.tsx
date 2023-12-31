import Link from 'next/link';
import NavLinks from '@/features/search/NavLinks';
import Cart from '@/features/search/Cart';
import GiantBombLogo from '@/features/GiantBombLogo';
import { Suspense } from 'react';

export default function SideNav() {
  return (
    <Suspense fallback={<p>... Loading ...</p>}>
      <div className="flex h-full flex-col px-3 py-4 md:px-2">
        <Link
          prefetch={true}
          className="mb-2 flex h-20 items-end justify-center rounded-md bg-slate-600 p-4 md:h-40"
          href="/search"
        >
          <GiantBombLogo />
        </Link>
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks />
          <Cart />
        </div>
      </div>
    </Suspense>
  );
}
