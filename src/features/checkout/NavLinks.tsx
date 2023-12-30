'use client';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';
import useStore from '@/lib/utils/useStore';
import { useCartItems } from '@/store/useCartItems';

const SmallLogoComponent = ({ className }) => {
  return (
    < Image
      className={className}
      priority={true}
      src="/giant-bomb-rentals-mobile.png"
      width={40}
      height={40}
      alt="Giant Bomb Rentals mobile logo"
    />
  )
}
const links = [
  {
    name: 'Games',
    href: '/search',
    icon: SmallLogoComponent,
  },
  {
    name: 'Checkout',
    href: '/checkout',
    icon: ShoppingCartIcon,
  },
];

export default function NavLinks() {
  const cartItems = useStore(useCartItems, (state) => state);
  const pathname = usePathname();
  const cartItemIterator = !!cartItems && cartItems?.entries();
  const cartArray = !cartItemIterator ? [] : Array.from(cartItemIterator);
  const sumItems = cartArray.reduce((total, [id, itm]) => total + itm?.selectedPlatforms?.length, 0)
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <div key={link.name} className='flex grow gap-2 md:gap-0 md:grow-0'>
            <Link
              prefetch={true}
              href={link.href}
              className={clsx("flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-slate-50 p-3 text-sm font-medium hover:bg-slate-600 hover:text-white md:justify-start md:p-2 md:px-3",
                {
                  'bg-slate-600 text-white': pathname === link.href,
                })}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
              <div className={clsx('',
                {
                  'text-white': pathname === link.href,
                }
              )}>
                {
                  link.name == "Checkout" && cartItems ? sumItems + " Items" : <span></span>
                }
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
}
