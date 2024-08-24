import { FloatLabel } from 'primereact/floatlabel';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

interface GeneralInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconClass: string;
  label: string;
  type?: string;
}

const GeneralInput: React.FC<GeneralInputProps> = ({
  id,
  name,
  value,
  onChange,
  iconClass,
  label,
  type = 'text',
}) => (
  <FloatLabel>
    <IconField iconPosition="left" className="w-full text-500">
      <InputIcon className={iconClass}> </InputIcon>

      <InputText
        id={id}
        name={name}
        value={value}
        className="w-full bg-white "
        onChange={onChange}
        type={type}
      />
    </IconField>
    <label htmlFor={id} className="left-3 text-400">
      {label}
    </label>
  </FloatLabel>
);

export default GeneralInput;
