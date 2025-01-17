// components/fields/TextareaField.tsx
import { ChangeEvent } from 'react';

interface TextareaFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

export default function TextareaField({
  id,
  name,
  label,
  value,
  onChange,
  required = false,
}: TextareaFieldProps) {
  return (
    <div className="form-group">
      <label className="form-label" >{label}</label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="form-field"
        rows={8}
      />
    </div>
  );
}
