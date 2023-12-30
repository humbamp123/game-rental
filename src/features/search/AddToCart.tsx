'use client';

import GamePlatform from '@/features/search/GamePlatform';
import useStore from '@/lib/utils/useStore';
import { useCartItems } from '@/store/useCartItems';
import { useCartItemsStore } from '@/store/useCartItemsStore';

export default function AddToCart({ game }) {
  const cartItems = useStore(useCartItems, (state) => state);
  const handleRemoveItem = useCartItemsStore((state) => state.remove);

  const gameInCart = cartItems?.get(game.id);

  return (
    <div className='flex flex-col items-center gap-3 py-3'>
      <p className='underline my-1'>Choose platform(s)</p>
      <div className='flex flex-wrap gap-1'>
        {
          game?.platforms?.map((platform, idx) => <GamePlatform key={game.id + idx} game={game} platform={platform} />)
        }
      </div>
      {
        !gameInCart ? <></> :
          <button
            className={'rounded-full w-11 h-11 bg-slate-300 sm:block md:hidden'}
            onClick={() => handleRemoveItem(game)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="block m-auto w-6 h-6" >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12" >
              </path>
            </svg>
          </button>
      }
    </div>
  )
}
