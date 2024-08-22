import { FloatLabel } from 'primereact/floatlabel';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

interface FloatingInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconClass: string;
  label: string;
  type?: string;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  id,
  value,
  onChange,
  iconClass,
  label,
  type = 'text',
}) => (
  <FloatLabel>
    <IconField iconPosition="left">
      <InputIcon className={iconClass} />
      {type === 'password' ? (
        <Password
          inputId={id}
          value={value}
          onChange={onChange}
          className="w-full"
          inputStyle={{ borderLeft: 'none' }}
        />
      ) : (
        <InputText
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className="w-full"
        />
      )}
    </IconField>
    <label htmlFor={id} className="floating-label pl-5">
      {label}
    </label>
  </FloatLabel>
);

export default FloatingInput;
