'use client';

import { usePaymentForm } from '@/store/form';

export default function PaymentCard() {
  const { firstName, lastName, creditCardNumber, expirationMonth, expirationYear } = usePaymentForm.getState().formValues
  return (
    <div className='flex flex-col gap-4 p-4 rounded bg-slate-200'>
      <p className='text-lg font-bold'>Credit Card Info</p>
      <div>
        <u>Name:</u>
        <p className='text-sm'>{[firstName, lastName].join(' ')}</p>
      </div>
      <div>
        <u>Credit Card Info:</u>
        <p className='text-sm'>{"****-****-****-" + creditCardNumber.toString().slice(-4)}</p>
        <p className='text-sm'>{"Exp. " + expirationMonth.value + "/" + expirationYear.value}</p>
      </div>
    </div >
  )
}
