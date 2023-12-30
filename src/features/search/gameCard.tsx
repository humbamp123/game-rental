import Image from 'next/image';
import AddToCart from '@/features/search/AddToCart';
import { Suspense } from 'react';

export default function GameCard({ game }) {
  return (
    <div className='flex grow justify-center border rounded shadow bg-slate-50'>
      <div className='flex flex-col justify-between m-3 gap-2'>
        <div className='flex flex-col gap-1'>
          <div className='flex justify-center relative'>
            <Image
              className='w-auto h-auto'
              src={game?.image?.screen_url}
              height={300}
              width={300}
              alt={game.name}
            />
          </div>
          <strong className='flex wrap'>{game.name}</strong>
          <p className='text-xs'>{"Released: " + (game.original_release_date || game.expected_release_year) || "N/A"}</p>
          <p>Description:</p>
          <p className='text-sm'>{game.deck ? game.deck : "No Description"}</p>
        </div>
        <Suspense fallback={<p>... Loading ...</p>}>
          <AddToCart game={game} />
        </Suspense>
      </div>
    </div>
  )
}
