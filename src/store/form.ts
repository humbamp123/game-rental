import { makeValidator, makeValidatorUtils, makeMakeFormStore, makeFormHooks } from "zustand-form-dev";
import { isExpired } from "@/lib/utils/date";

const { stringDoesntMatch, stringMatches } = makeValidatorUtils();

const valueTypes = {
  text: { blankValue: "" },
  number: { blankValue: "" },
  boolean: { blankValue: false },
  option: { blankValue: "" },
};

const validatorFunctions = {
  required: makeValidator(({ value }) =>
    !value ? "Required field" : undefined
  ),
  email: makeValidator(({ value }) => {
    if (stringDoesntMatch(value, "email")) return "Please enter a valid email";
  }),
  numberRequiredLength: makeValidator(({ value, validatorOptions: { min, max } }) => {
    if (!!value && (value.length < min || value.length > max || stringMatches(value, "aNonNumber"))) {
      let withOnlyDigits = value.replace(/[^0-9]/g, '');
      return {
        message: `Enter ${max} digits`,
        editedValue: withOnlyDigits.substring(0, max),
      };
    }
  }),
  nonNumberRequiredLength: makeValidator(({ value, validatorOptions: { min, max } }) => {
    if (!!value && (value.length < min || value.length > max || stringMatches(value, "aNumber"))) {
      let withNoDigits = value.replace(/[0-9]/g, '');
      return {
        message: `Must be alphabetical, max ${max} digits`,
        editedValue: withNoDigits.substring(0, max),
      };
    }
  }),
  requiredLength: makeValidator(
    ({ value, validatorOptions: { min, max } }) => {
      if (!!min && value.length < min)
        return `must be at least ${min} characters`;

      if (!!max && value.length > max)
        return {
          message: `must be less than ${max + 1} characters`,
          editedValue: value.substring(0, max), // This edits the value directly to be valid
        };
    }
  ),
  creditCardNotExpired: makeValidator(
    ({ value, formState, validatorOptions: { otherInputId, message } }) => {
      const { value: newValue, idx } = value;
      const otherValue = formState.inputStates[otherInputId].value
      const bothValuesExists = !!newValue && !!otherValue
      const [month, year] = otherInputId == "expirationYear" ?
        [idx - 1, otherValue.value ] :
        [ otherValue.idx - 1 , newValue ]
      if (bothValuesExists && isExpired({ month, year})) return `Card Expired`
    })
};

const makeFormStore = makeMakeFormStore(validatorFunctions, valueTypes);

const nameFields = {
  firstName: { valueType: "text", defaultValidators: ["required"] },
  lastName: { valueType: "text", defaultValidators: ["required"] },
}

export const useContactForm = makeFormStore({
  ...nameFields,
  phoneNumber: {
    valueType: "number",
    defaultValidators: ["required", "numberRequiredLength"],
    defaultValidatorsOptions: {
      numberRequiredLength: {
        min: 10,
        max: 10,
      },
    },
  },
  email: {
    valueType: "text",
    defaultValidators: ["required", "email", "requiredLength"],
    defaultValidatorsOptions: {
      requiredLength: { max: 64 },
    },
  },
});

const addressForm = {
  ...nameFields,
  streetAddress: { valueType: "text", defaultValidators: ["required"] },
  city: { valueType: "text", defaultValidators: ["required"] },
  state: {
    valueType: "text",
    defaultValidators: ["required", "nonNumberRequiredLength"],
    defaultValidatorsOptions: {
      nonNumberRequiredLength: {
        min: 2,
        max: 2,
      },
    },
  },
  zipCode: {
    valueType: "number",
    defaultValidators: ["required", "numberRequiredLength"],
    defaultValidatorsOptions: {
      numberRequiredLength: {
        min: 5,
        max: 5,
      },
    },
  },
}

export const useShippingForm = makeFormStore({
  ...addressForm,
  billingSameAsShipping: { valueType: "boolean" },
});

export const useBillingForm = makeFormStore(addressForm);

export const usePaymentForm = makeFormStore({
  ...nameFields,
  creditCardNumber: {
    valueType: "number",
    defaultValidators: ["required", "numberRequiredLength"],
    defaultValidatorsOptions: {
      numberRequiredLength: {
        min: 16,
        max: 16,
      },
    },
  },
  expirationMonth: {
    valueType: "option",
    defaultValidators: ["required", "creditCardNotExpired"],
    defaultValidatorsOptions: {
      creditCardNotExpired: {
        otherInputId: "expirationYear"
      },
    },
  },
  expirationYear: {
    valueType: "option",
    defaultValidators: ["required", "creditCardNotExpired"],
    defaultValidatorsOptions: {
      creditCardNotExpired: {
        otherInputId: "expirationMonth",
      }
    }
  },
  csc: {
    valueType: "number",
    defaultValidators: ["required", "numberRequiredLength"],
    defaultValidatorsOptions: {
      numberRequiredLength: {
        min: 3,
        max: 3,
      },
    },
  },
});

// These form hooks can be used as-is, or a combined hook can be made below

// Add all form stores keyed by form name
const formStores = { contact: useContactForm,
                     shipping: useShippingForm,
                     billing: useBillingForm,
                     payment: usePaymentForm};

// Get forms hook
export const { useFormInput } = makeFormHooks(formStores);
