'use client'

import {  useCartItemsStore } from '@/store/useCartItemsStore';
import { useCartItems } from '@/store/useCartItems';
import useStore from '@/lib/utils/useStore';

export default function Cart() {
  const cartItems = useStore(useCartItems, (state) => state);
  const handleRemoveItem = useCartItemsStore((state) => state.remove)
  const cartItemIterator = !!cartItems && cartItems?.entries();
  const cartArray = !cartItemIterator ? [] : Array.from(cartItemIterator);
  if (cartArray?.length > 0) {
    return (
      <div className="hidden overflow-y-auto w-full grow p-3 rounded-md bg-gray-50 md:block md:h-5">
        <u>Items in cart:</u>
        <ul>
          {
            cartArray.map(([k, val]) =>
              <div key={val?.id}>
                <li className='w-full grow'>
                  <div className='flex py-3 flex-row justify-between'>
                    <div>
                      <p>{val?.name}</p>
                      <div className='flex flex-wrap'>{val?.selectedPlatforms?.map((platform) =>
                        <span
                          className={'rounded-full text-xs text-white bg-slate-600 p-1'}
                          key={platform.abbreviation}>
                          {
                            platform.abbreviation
                          }
                        </span>
                      )}
                      </div>
                    </div>
                    <button onClick={() => handleRemoveItem(val)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-6 h-6" >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12" >
                        </path>
                      </svg>
                    </button>
                  </div>
                </li>
              </div>
            )
          }
        </ul>
      </div>
    )
  } else {
    return (
      <div className="hidden overflow-y-auto w-full grow p-3 rounded-md bg-gray-50 md:block md:h-5">
      </div>
    )
  }
}


