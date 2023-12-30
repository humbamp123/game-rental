'use client';

import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import clsx from "clsx";
import { useConfirmedStore } from '@/store/useConfirmedStore';
import { useEffect } from "react";
import { useContactForm, useShippingForm, useBillingForm, usePaymentForm } from "@/store/form";
import useStore from '@/lib/utils/useStore';
import { useCartItems } from '@/store/useCartItems';

export default function Confirmed() {
  const cartItems = useStore(useCartItems, (state) => state);
  const handleClearConfirmedCart = useConfirmedStore((state) => state.clear);
  const handleTransferToConfirm = useConfirmedStore((state) => state.copy);

  useEffect(() => handleClearConfirmedCart(), [handleClearConfirmedCart]);

  const handleConfirm = () => {handleTransferToConfirm(cartItems);}

  const contactFormValid = useContactForm((state) => state.isValid);
  const shippingFormValid = useShippingForm((state) => state.isValid);
  const billingFormValid = useBillingForm((state) => state.isValid);
  const paymentFormValid = usePaymentForm((state) => state.isValid);
  const billingSameAsShipping = useShippingForm.getState().formValues['billingSameAsShipping']
  const formsToValidate = billingSameAsShipping ? [contactFormValid, shippingFormValid, paymentFormValid] : [contactFormValid, shippingFormValid, billingFormValid, paymentFormValid];
  const submitDisabled = !formsToValidate.every(formIsValid => formIsValid);
  return (
    <Link
      prefetch={true}
      href="/confirmed"
        onClick={() => handleConfirm()}
        className={clsx("flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-slate-50 p-3 text-sm font-medium hover:bg-slate-600 hover:text-white md:justify-start md:p-2 md:px-3 md:w-60",
          {
            'pointer-events-none aria-disabled text-slate-300': submitDisabled
          })} >
        <CheckCircleIcon className="w-6" />
        <div>Submit Order</div>
      </Link>
  )
}
