import { useFormInput } from "@/store/form";

export const FormSelectInput = ({ formName, inputId, title, options}) => {

  const {
    onChange, onFocus, onBlur, className
  } = useFormInput({ inputId, formName });

  return (
    <div className="grow">
      <div>{title}</div>
      <select
        className={!className ? "p-2 rounded w-full" : className + "p-2 rounded w-full"}
        onChange={(e) => onChange({
          value: e.target.value,
          idx: e.target.selectedIndex
        })}
        {...{ onFocus, onBlur }}
      >
        {
          !!options && options.map((itm) =>
            <option key={itm} value={itm}>
              {itm}
            </option>
          )
        }
      </select>
    </div>
  );
};


