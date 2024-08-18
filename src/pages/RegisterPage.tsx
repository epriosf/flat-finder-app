import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { FileUpload } from 'primereact/fileupload';
import { FloatLabel } from 'primereact/floatlabel';
import { Password } from 'primereact/password';
import { Nullable } from 'primereact/ts-helpers';
import { useState } from 'react';
import { styled } from 'styled-components';
import FloatingInput, { FormField } from '../components/Commons/FloatingInput';

const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  transition: all 0.8s;
  background-color: rgb(49, 46, 129, 0.3);
  border: 1px solid white;
  border-radius: 14px;
  backdrop-filter: blur(10px);
  width: 100%;
`;

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState<Nullable<Date>>(null);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleRegister = () => {
    console.log('handle Register');
  };
  return (
    <>
      <StyledFormContainer>
        <FloatingInput
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          iconClass="pi pi-user"
          label="First Name"
          type="text"
        />

        <FloatingInput
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          iconClass="pi pi-user"
          label="Last Name"
          type="text"
        ></FloatingInput>

        <FloatingInput
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          iconClass="pi pi-envelope"
          label="Email"
          type="text"
        ></FloatingInput>

        <FormField>
          <FloatLabel>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-calendar"></i>
              </span>
              <Calendar
                inputId="birth_date"
                value={birthday}
                onChange={(e) => setBirthday(e.value)}
                className="w-full"
                inputStyle={{ borderLeft: 'none' }}
              />
            </div>
            <label htmlFor="birth_date" className="floating-label pl-5">
              Birth Date
            </label>
          </FloatLabel>
        </FormField>

        <FormField>
          <FloatLabel>
            <div className="p-inputgroup ">
              <span className="p-inputgroup-addon">
                <i className="pi pi-lock"></i>
              </span>
              <Password
                inputId="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                className="w-full"
                inputStyle={{ borderLeft: 'none' }}
              />
            </div>
            <label htmlFor="password" className="floating-label pl-5 w-full">
              Password
            </label>
          </FloatLabel>
        </FormField>

        <FormField>
          <FloatLabel>
            <div className="p-inputgroup ">
              <span className="p-inputgroup-addon">
                <i className="pi pi-lock"></i>
              </span>
              <Password
                inputId="password"
                value={passwordConfirm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPasswordConfirm(e.target.value)
                }
                className="w-full"
                inputStyle={{ borderLeft: 'none' }}
              />
            </div>
            <label
              htmlFor="passwordConfirm"
              className="floating-label pl-5 w-full"
            >
              Confirm Password
            </label>
          </FloatLabel>
        </FormField>

        <FormField>
          <FileUpload
            name="demo[]"
            url={'/api/upload'}
            multiple
            accept="image/*"
            maxFileSize={1000000}
            emptyTemplate={
              <p className="m-0">Drag and drop images to here to upload.</p>
            }
            chooseLabel="Photo"
          />
        </FormField>

        <Button
          label="Sign up"
          className="w-full"
          onClick={handleRegister}
          type="submit"
        />
      </StyledFormContainer>
    </>
  );
};

export default RegisterPage;
