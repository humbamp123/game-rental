'use client';

import { useShippingForm, useBillingForm } from '@/store/form';

export default function AddressCard({ title }) {
  const billingSameAsShipping = useShippingForm.getState().formValues['billingSameAsShipping']
  const useForm = billingSameAsShipping || title.toLowerCase().includes('shipping') ? useShippingForm : useBillingForm
  const { firstName, lastName, streetAddress, city, state, zipCode } = useForm.getState().formValues
  return (
    <div className='flex flex-col gap-4 p-4 rounded bg-slate-200'>
      <p className='text-lg font-bold'>{title}</p>
      <div>
        <u>Name:</u>
        <p className='text-sm'>{[firstName, lastName].join(' ')}</p>
      </div>
      <div>
        <u>Address:</u>
        <p className='text-sm'>{[streetAddress, city, state, zipCode].join(', ')}</p>
      </div>
    </div >
  )
}
