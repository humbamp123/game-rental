'use client';
import { useContactForm } from '@/store/form';

export default function ContactCard() {
  const { firstName, lastName, email, phoneNumber } = useContactForm.getState().formValues
  return (
    <div className='flex flex-col gap-4 p-4 rounded bg-slate-200'>
      <p className='text-lg font-bold'>Contact Info</p>
      <div>
        <u>Name:</u>
        <p className='text-sm'>{[firstName, lastName].join(' ')}</p>
      </div>
      <div>
        <u>Email:</u>
        <p className='text-sm'>{email}</p>
      </div>
      <div>
        <u>Phone Number:</u>
        <p className='text-sm'>{phoneNumber}</p>
      </div>
    </div>
  )
}


