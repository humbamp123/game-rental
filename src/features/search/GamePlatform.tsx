'use client';

import useStore from '@/lib/utils/useStore';
import { useCartItems } from '@/store/useCartItems';
import { useCartItemsStore } from '@/store/useCartItemsStore';
import clsx from 'clsx';

export default function GamePlatform({ game, platform }) {
  const cartItems = useStore(useCartItems, (state) => state);
  const handleAddItem = useCartItemsStore((state) => state.add);
  const handleRemovePlatform = useCartItemsStore((state) => state.removePlatform);

  const gameInCart = cartItems?.get(game?.id);
  const platformInCart = gameInCart?.selectedPlatforms?.filter((itm) => itm.id == platform.id)[0];
  const handleOnClick = () => !!platformInCart ? handleRemovePlatform(game, platform) : handleAddItem(game, platform);
  if (game?.platforms) {
    return (
      <button
        key={game.id + platform.abbreviation}
        className={clsx('rounded-full text-xs bg-slate-600 border border-2 border-slate-600 p-5',
          {
            'text-slate-400 bg-white border border-2 border-slate-400 md:hover:text-red-300 md:hover:bg-white md:hover:border md:hover:border-2 md:hover:border-red-300': !!platformInCart,
            'text-white md:hover:text-slate-400 md:hover:bg-white md:hover:border md:hover:border-2 md:hover:border-slate-400': !platformInCart
          }
        )}
        onClick={() => handleOnClick()}>
        {platform.abbreviation}
      </button>)
  } else {
    <></>
  }
}
