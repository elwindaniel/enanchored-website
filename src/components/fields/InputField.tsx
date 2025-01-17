// components/InputField.tsx
import { ChangeEvent } from "react";

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function InputField({
  id,
  name,
  type,
  label,
  value,
  onChange,
  required = false,
}: InputFieldProps) {
  return (
    <div className="form-group">
      <label className="form-label" >
        {label}
      </label>
      <input
        className="form-field"
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
