'use client';

import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import GameConfirmedCard from '@/features/confirmed/GameConfirmedCard';
import { useConfirmedItems } from '@/store/useConfirmedStore';
import useStore from "@/lib/utils/useStore";
import { useCartItemsStore } from "@/store/useCartItemsStore";

export default function ConfirmedItems() {
  const confirmedItems = useStore(useConfirmedItems, (state) => state);
  const { push } = useRouter();
  const handleClearCartItems = useCartItemsStore((state) => state.removeAll);

  useEffect(() => handleClearCartItems(), [handleClearCartItems]);

  useEffect(() => {
    if (confirmedItems?.size == 0) {
      push("/search")
    }
  }, [confirmedItems, push]);

  const confirmedItemIterator = !!confirmedItems && confirmedItems?.entries();
  const confirmedItemsArray = !confirmedItemIterator ? [] : Array.from(confirmedItemIterator);

  if (!!confirmedItemsArray) {
    return (
      <>
        {
          confirmedItemsArray?.map(([id, game]) => <GameConfirmedCard key={id} game={game} />)
        }
      </>
    )
  } else {
    return (
    <></>
    )
  };
}
