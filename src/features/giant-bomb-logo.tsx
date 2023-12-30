import { lusitana } from '@/features/fonts';
import Image from 'next/image';

export default function GiantBombRentalsLogo() {
  return (
    <div className={`${lusitana.className} flex w-32 text-white md:w-40`}>
      <div className={`flex flex-col items-center leading-none hidden md:block`} >
        <Image
          priority={true}
          className='h-auto w-auto'
          src="/Giant_Bomb_Rentals_logo.webp"
          width={200}
          height={100}
          alt="Giant Bomb Rentals logo"
        />
        <p className="text-[34px] text-center">&quot;Rentals&quot;</p>
      </div>
      <div className="flex flex-row items-end leading-none block md:hidden">
        <Image
          priority={true}
          src="/giant-bomb-rentals-mobile.png"
          className='h-auto w-auto'
          width={40}
          height={40}
          alt="Giant Bomb Rentals mobile logo"
        />
        <p className="text-[34px]">&quot;Rentals&quot;</p>
      </div>
    </div>
  );
}
