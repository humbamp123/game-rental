import { useFormInput } from "@/store/form";

export default function FormInput ({ formName, inputId, title }) {
  const {
    onChange, value, onFocus, onBlur, inlineErrorTexts, canShowErrors, className
  } = useFormInput({ inputId, formName });
  const nonRepeatingErrors = [...new Set(inlineErrorTexts)];

  return (
    <div className="grow">
      <div>{title}</div>
      <input
        className={!className ? "p-2 rounded w-full" : className + "p-2 rounded w-full"}
        {...{ onFocus, onBlur, value }}
        onChange={(e) => onChange(e.target.value)}
      />
      {canShowErrors && <div className="text-red-500">{nonRepeatingErrors.join(", ")}</div>}
    </div>
  );
};
