'use client';

import FormInput from "@/features/checkout/FormInput";
import { FormSelectInput } from "@/features/checkout/FormSelectInput";
import { useEffect } from 'react';
import { usePaymentForm } from '@/store/form';
import { expirationMonthOptions, expirationYearOptions } from "@/lib/utils/date";
import { useFormInput } from "@/store/form";
import { isExpired } from "@/lib/utils/date";

export default function PaymentInputs() {
  const refreshForm = usePaymentForm((state) => state.refreshForm);
  useEffect(refreshForm, [refreshForm]);

  const { inlineErrorTexts: monthErrors,
          canShowErrors: canShowMonthErrors,
          value: month} = useFormInput({
    "inputId": "expirationMonth",
    "formName": "payment",
          });

  const { inlineErrorTexts: yearErrors,
          canShowErrors: canShowYearErrors,
          value: year} = useFormInput({
      "inputId": "expirationYear",
      "formName": "payment",
    });

  const showExpired = isExpired({ 'month': month.idx - 1, 'year': year.value })
  const nonRepeatingErrors = [...new Set([...monthErrors, ...yearErrors])];

  return (
    <div className="flex flex-col gap-4 p-4 rounded bg-slate-200">
      <div className="font-bold">Credit Card</div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-center gap-2">
          <FormInput title="First Name*" formName="payment" inputId="firstName" />
          <FormInput title="Last Name*" formName="payment" inputId="lastName" />
        </div>
        <FormInput title="Credit Card Number*" formName="payment" inputId="creditCardNumber" />
        <div className="flex flex-row justify-center gap-2">
          <FormSelectInput title="Exp. Month*" formName="payment" inputId="expirationMonth" options={expirationMonthOptions} />
          <FormSelectInput title="Exp. Year*" formName="payment" inputId="expirationYear" options={expirationYearOptions} />
          <FormInput title="CSC*" formName="payment" inputId="csc" />
        </div>
      {(canShowMonthErrors || canShowYearErrors) && showExpired && <div className="text-red-500">{nonRepeatingErrors.join(", ")}</div>}
      </div>
      <p className="text-xs">* Required Field</p>
    </div>
  )
}


