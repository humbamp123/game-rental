'use client'

import useStore from "@/lib/utils/useStore";
import { useCartItems } from "@/store/useCartItems";

export default function Cart() {
  const cartItems = useStore(useCartItems, (state) => state);
  const cartItemIterator = cartItems && cartItems?.entries();
  const cartArray = !cartItemIterator ? [] : Array.from(cartItemIterator);
  return (
    <div className="hidden overflow-y-auto w-full grow p-3 rounded-md bg-gray-50 md:block md:h-5">
      <u>Items in cart:</u>
      <ul>
        {
          cartItems?.size == 0 ? <></> :
            cartArray.map(([k, val]) =>
              <div key={val?.id}>
                <li className='w-full flex py-3 flex-row justify-between'>
                    <div>
                      <p>- {val?.name}</p>
                    <div className="flex flex-wrap">{val?.selectedPlatforms?.map((platform) =>
                      <span
                        className={'rounded-full text-xs text-white bg-slate-600 p-1'}
                        key={platform?.abbreviation}>
                        {
                          platform?.abbreviation
                        }
                      </span>
                    )}
                    </div>
                  </div>
                </li>
              </div>
            )
        }
      </ul>
    </div>

  )
}




