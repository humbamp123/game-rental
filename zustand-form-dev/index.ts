import { useStoreWithEqualityFn } from "zustand";

export { default as makeMakeFormStore } from "./makeFormStore";
export {
  makeValidatorFunction as makeValidator,
  makeValidatorUtils,
  getTypedMakeValidator,
} from "./makeFormStore/validatorFunctionUtils";
export { makeFormHooks } from "./makeFormHooks";

export type { MakeFormStoresHelperTypes } from "./utils/typeHelpers";

export type InputIdFromFormStore<
  T_FormApi extends useStoreWithEqualityFn<any>
> = keyof ReturnType<T_FormApi["getState"]>["inputStates"];

// export type {
//   InputValue,
//   InputValueFromOptions,
//   MakeInputsOptions,
// } from "./makeFormStore/types";
