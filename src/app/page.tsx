import Link from 'next/link';
import { lusitana } from '@/features/fonts';
import Image from 'next/image';

import GiantBombRentalsLogo from '@/features/giant-bomb-logo';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 items-end justify-center rounded-lg bg-slate-600 p-4 md:h-40">
        <GiantBombRentalsLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-slate-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`${lusitana.className} text-xl text-slate-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Giant Bomb &quot;Rentals&quot;.</strong> &quot;Rent&quot; now, pay once it&apos;s returned.
          </p>
          <Link
            href="/search"
            className="flex items-center gap-5 self-start rounded-lg bg-slate-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-400 md:text-base"
          >
            Search for any game
          </Link>
          <p className={`${lusitana.className} text-xl text-slate-800 md:text-3xl md:leading-normal`}>If the game exists, we&apos;ll &quot;rent&quot; it to you!</p>
        </div>
        <div className="flex items-center justify-center md:w-4/5 md:px-28 md:py-12">
          <Image
            priority={true}
            className='h-auto w-auto'
            src="/giant_bomb_rentals_screenshot.png"
            width={1000}
            height={1000}
            alt="Giant Bomb Rentals Screenshot"
          />
        </div>
      </div>
    </main>
  )
}
