import AddressInputs from "@/features/checkout/AddressInputs";
import ContactInputs from "@/features/checkout/ContactInputs";
import PaymentInputs from "@/features/checkout/PaymentInputs";
import ShippingAsBilling from "@/features/checkout/ShippingAsBilling";
import Confirmed from "@/features/checkout/Confirmed";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 max-w-4xl">
      <ContactInputs />
      <AddressInputs title="Shipping Address" formName="shipping" />
      <ShippingAsBilling />
      <PaymentInputs />
      <Confirmed />
      <div className="pb-12 md:pb-4 w-full md:block"></div>
    </div>
  );
}
