import { FloatLabel } from 'primereact/floatlabel';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';

interface GeneralInputProps {
  id: string;
  name: string;
  value: string | number | null;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | InputNumberValueChangeEvent,
  ) => void;
  iconClass: string;
  label: string;
  type?: 'text' | 'number' | 'email';
  className?: string;
}

const GeneralInput: React.FC<GeneralInputProps> = ({
  id,
  name,
  value,
  onChange,
  iconClass,
  label,
  type = 'text',
  className = '',
}) => (
  <FloatLabel>
    <IconField iconPosition="left" className="w-full text-500">
      <InputIcon className={iconClass}> </InputIcon>
      {type === 'number' ? (
        <InputNumber
          id={id}
          name={name}
          value={value as number | null}
          onValueChange={(e) => onChange(e)}
          className={`w-full bg-white ${className}`}
          mode="decimal"
        />
      ) : (
        <InputText
          id={id}
          name={name}
          value={value as string}
          className={`w-full bg-white ${className}`}
          onChange={onChange}
          type={type}
        />
      )}
    </IconField>
    <label htmlFor={id} className="left-3 text-400 w-full">
      {label}
    </label>
  </FloatLabel>
);

export default GeneralInput;
