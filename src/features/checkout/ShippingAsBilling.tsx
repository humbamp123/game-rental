'use client';

import { useShippingForm } from "@/store/form";
import AddressInputs from "@/features/checkout/AddressInputs";

export default function ShippingAsBilling() {
  const { updateInput } = useShippingForm()
  const billingSameAsShipping = useShippingForm.getState().formValues['billingSameAsShipping']

  return (
    <>
      <label className="flex justify-start gap-3 px-4 py-2">
        <input
          type="checkbox"
          onChange={(e) => updateInput({
            'inputId': 'billingSameAsShipping',
            'newValue': e.target.checked,
          })} />
        <p>Billing Address is the same as Shipping Address</p>
      </label>
      {
        !!billingSameAsShipping ? <></> : <AddressInputs title="Billing Address" formName="billing" />
      }
    </>
  )
}
