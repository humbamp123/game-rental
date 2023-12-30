'use client';

import FormInput from '@/features/checkout/FormInput'
import { useEffect } from 'react';
import { useShippingForm, useBillingForm } from '@/store/form';

export default function AddressInputs({ title, formName }) {
  const useForm = formName == 'shipping' ? useShippingForm : useBillingForm
  const refreshForm = useForm((state) => state.refreshForm);
  useEffect(refreshForm, [refreshForm])

  return (
    <div className="flex flex-col gap-4 p-4 rounded bg-slate-200">
      <div className="font-bold">{title}</div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-center gap-2">
          <FormInput title="First Name*" formName={formName} inputId="firstName" />
          <FormInput title="Last Name*" formName={formName} inputId="lastName" />
        </div>
        <FormInput title="Street Address*" formName={formName} inputId="streetAddress" />
        <FormInput title="City*" formName={formName} inputId="city" />
        <div className="flex flex-row justify-center gap-2">
          <FormInput title="State*" formName={formName} inputId="state" />
          <FormInput title="Zip Code*" formName={formName} inputId="zipCode" />
        </div>
      </div>
      <p className="text-xs">* Required Field</p>
    </div>
  )
}


