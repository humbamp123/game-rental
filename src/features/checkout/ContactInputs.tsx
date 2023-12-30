'use client';

import FormInput from '@/features/checkout/FormInput'
import { useEffect } from 'react';
import { useContactForm } from '@/store/form';

export default function ContactInputs() {
  const refreshForm = useContactForm((state) => state.refreshForm);
  useEffect(refreshForm, [refreshForm])

  return (
    <div className="flex flex-col gap-4 p-4 rounded bg-slate-200">
      <div className="font-bold">Contact Info</div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-center gap-2">
          <FormInput title="First Name*" formName="contact" inputId="firstName" />
          <FormInput title="Last Name*" formName="contact" inputId="lastName" />
        </div>
        <FormInput title="Phone Number*" formName="contact" inputId="phoneNumber" />
        <FormInput title="Email Address*" formName="contact" inputId="email" />
      </div>
      <p className="text-xs">* Required Field</p>
    </div>
  )
}


