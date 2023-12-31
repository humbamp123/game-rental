import Link from 'next/link';
import GiantBombLogo from '@/features/GiantBombLogo';
import ContactCard from '@/features/confirmed/ContactCard';
import AddressCard from '@/features/confirmed/AddressCard';
import PaymentCard from '@/features/confirmed/PaymentCard';
import ConfirmedItems from '@/features/confirmed/ConfirmedItems';

export default function Page() {
  return (
    <div className='flex flex-col gap-2 max-w-7xl'>
      <Link
        prefetch={true}
        className="mb-2 flex h-20 justify-center rounded-md bg-slate-600 p-4 md:h-40"
        href="/search" >
        <GiantBombLogo />
      </Link>
      <div className='text-xl text-center font-bold'>
        Rental Order Confirmed
      </div>
      <ContactCard />
      <AddressCard title='Shipping Address' />
      <AddressCard title='Billing Address' />
      <PaymentCard />
      <div className='text-center text-lg font-bold'>
        Cart Items
      </div>
      <ConfirmedItems />
    </div>
  );
}
