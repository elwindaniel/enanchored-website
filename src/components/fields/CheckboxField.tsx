// components/CheckboxField.tsx
import { ChangeEvent } from "react";

interface CheckboxFieldProps {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckboxField({
  id,
  name,
  label,
  checked,
  onChange,
}: CheckboxFieldProps) {
  return (
    <div className="form-group">
      <label className="form-label">
      {label}
        <input
          className="form-field"
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
        />
      </label>
    </div>
  );
}
