// components/SelectField.tsx
import { ChangeEvent } from "react";

interface SelectFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

export default function SelectField({
  id,
  name,
  label,
  value,
  options,
  onChange,
  required = false,
}: SelectFieldProps) {
  return (
    <div className="form-group">
      <label className="form-label" >
        {label}
      </label>
      <select
        className="form-field"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
