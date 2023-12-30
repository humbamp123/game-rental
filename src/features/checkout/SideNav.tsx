'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NavLinks from '@/features/checkout/NavLinks';
import Cart from '@/features/checkout/Cart';
import GiantBombRentalsLogo from '@/features/giant-bomb-logo';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useConfirmedStore } from '@/store/useConfirmedStore';
import { useContactForm, useShippingForm, useBillingForm, usePaymentForm } from "@/store/form";
import { useEffect } from "react";
import clsx from 'clsx';
import useStore from '@/lib/utils/useStore';
import { useCartItems } from '@/store/useCartItems';

export default function SideNav() {
  const cartItems = useStore(useCartItems, (state) => state)
  const handleTransferToConfirm = useConfirmedStore((state) => state.copy)

  const handleConfirm = () => {
    handleTransferToConfirm(cartItems);
  }

  const { push } = useRouter()

  useEffect(() => {
    if (cartItems?.size == 0) {
      push("/search")
    }
  }, [cartItems, push])


  const contactFormValid = useContactForm((state) => state.isValid);
  const shippingFormValid = useShippingForm((state) => state.isValid);
  const billingFormValid = useBillingForm((state) => state.isValid);
  const paymentFormValid = usePaymentForm((state) => state.isValid);

  const billingSameAsShipping = useShippingForm.getState().formValues['billingSameAsShipping']

  const formsToValidate = billingSameAsShipping ? [contactFormValid, shippingFormValid, paymentFormValid] : [contactFormValid, shippingFormValid, billingFormValid, paymentFormValid];
  const submitDisabled = !formsToValidate.every(formIsValid => formIsValid);

  return (
    <div className="flex h-full flex-col px-3 py-4 gap-2 md:px-2">
      <Link
        prefetch={true}
        className="mb-2 flex h-20 items-end justify-center rounded-md bg-slate-600 p-4 md:h-40"
        href="/search"
      >
        <GiantBombRentalsLogo />
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <Cart />
      </div>
      <Link
        prefetch={true}
        href="/confirmed"
        onClick={() => handleConfirm()}
        className={clsx("flex h-[48px] items-center justify-center gap-2 rounded-md bg-slate-50 p-3 text-sm font-medium hover:bg-slate-600 hover:text-white md:justify-start md:p-2 md:px-3",
          {
            'pointer-events-none aria-disabled text-slate-300': submitDisabled
          })} >
        <CheckCircleIcon className="w-6" />
        <div>Submit Order</div>
      </Link>
    </div>
  );
}
