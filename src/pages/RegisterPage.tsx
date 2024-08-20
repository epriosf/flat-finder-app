import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import { FloatLabel } from 'primereact/floatlabel';
import { Message } from 'primereact/message';
import { Password } from 'primereact/password';
import { Nullable } from 'primereact/ts-helpers';
import { useState } from 'react';
import { styled } from 'styled-components';
import * as Yup from 'yup';
import FloatingInput from '../components/Commons/FloatingInput';
import { createUser, uploadProfileImage } from '../services/firebase';

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
//Min and Max Dates
const today = new Date();
let minDate = new Date(today);
let maxDate = new Date(today);

//User Type
export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthday: Date;
  profile: string;
}

minDate.setFullYear(today.getFullYear() - 120);
maxDate.setFullYear(today.getFullYear() - 18);

const SignupSchema = Yup.object({
  firstName: Yup.string().required('First Name Required'),
  lastName: Yup.string().required('Last Name Required'),
  email: Yup.string().email('Invalid email').required('Email Required'),
  birthday: Yup.date()
    .required('Birth Date Required')
    .min(minDate, 'Date can not be 120 years more ago')
    .max(maxDate, 'Date can not be more than 18 years ago'),
  password: Yup.string().required('Password Required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Password Confirm Required'),
});

const RegisterPage = () => {
  const [profileUrl, setProfileUrl] = useState('');
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      birthday: null,
      password: '',
      passwordConfirm: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      const user: User = {
        firstname: values.firstName,
        lastname: values.lastName,
        email: values.email,
        birthday: values.birthday ? new Date(values.birthday) : new Date(today),
        password: values.password,
        profile: profileUrl ? profileUrl : '',
      };
      await createUser(user);
    },
  });

  const handleBirthdayChange = (e: Nullable<Date>) => {
    formik.setFieldValue('birthday', e);
    formik.setFieldTouched('birthday', true); // Mark birthday field as touched to trigger validation
  };

  const handleUploadImage = async (e: FileUploadHandlerEvent) => {
    const file = e.files[0];
    const imageUrl = await uploadProfileImage(file);
    setProfileUrl(imageUrl);
    console.log('Image Url', imageUrl);
  };

  return (
    <>
      <StyledFormContainer>
        <form onSubmit={formik.handleSubmit} className="w-full">
          <FloatingInput
            id="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            iconClass="pi pi-user"
            label="First Name"
            type="text"
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <Message
              severity="error"
              text={formik.errors.firstName}
              className="mb-1 pt-1"
              style={{ backgroundColor: 'transparent' }}
            />
          ) : (
            <div className="mt-5"></div>
          )}

          <FloatingInput
            id="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            iconClass="pi pi-user"
            label="Last Name"
            type="text"
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <Message
              severity="error"
              text={formik.errors.lastName}
              className="mb-1 mt--1"
              style={{ backgroundColor: 'transparent' }}
            />
          ) : (
            <div className="mt-5"></div>
          )}

          <FloatingInput
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            iconClass="pi pi-envelope"
            label="Email"
            type="text"
          />
          {formik.touched.email && formik.errors.email ? (
            <Message
              severity="error"
              text={formik.errors.email}
              className="mb-1"
              style={{ backgroundColor: 'transparent' }}
            />
          ) : (
            <div className="mt-5"></div>
          )}

          <FloatLabel>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-calendar"></i>
              </span>
              <Calendar
                inputId="birth_date"
                value={formik.values.birthday}
                onChange={(e) => handleBirthdayChange(e.value)}
                inputStyle={{ borderLeft: 'none' }}
                minDate={minDate}
                dateFormat="dd/mm/yy"
              />
            </div>
            <label htmlFor="birth_date" className="floating-label pl-5">
              Birth Date
            </label>
          </FloatLabel>
          {formik.touched.birthday && formik.errors.birthday ? (
            <Message
              severity="error"
              text={formik.errors.birthday}
              className="mb-1 mt--1"
              style={{ backgroundColor: 'transparent' }}
            />
          ) : (
            <div className="mt-5"></div>
          )}

          <FloatLabel>
            <div className="p-inputgroup ">
              <span className="p-inputgroup-addon">
                <i className="pi pi-lock"></i>
              </span>
              <Password
                inputId="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="w-full"
                inputStyle={{ borderLeft: 'none' }}
                onBlur={formik.handleBlur}
                toggleMask
              />
            </div>
            <label htmlFor="password" className="floating-label pl-5 w-full">
              Password
            </label>
          </FloatLabel>
          {formik.touched.password && formik.errors.password ? (
            <Message
              severity="error"
              text={formik.errors.password}
              className="mb-1"
              style={{ backgroundColor: 'transparent' }}
            />
          ) : (
            <div className="mt-5"></div>
          )}

          <FloatLabel>
            <div className="p-inputgroup ">
              <span className="p-inputgroup-addon">
                <i className="pi pi-lock"></i>
              </span>
              <Password
                inputId="passwordConfirm"
                value={formik.values.passwordConfirm}
                onChange={formik.handleChange}
                className="w-full"
                inputStyle={{ borderLeft: 'none' }}
                onBlur={formik.handleBlur}
              />
            </div>
            <label
              htmlFor="passwordConfirm"
              className="floating-label pl-5 w-full"
            >
              Confirm Password
            </label>
          </FloatLabel>
          {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
            <Message
              severity="error"
              text={formik.errors.passwordConfirm}
              className="mb-1"
              style={{ backgroundColor: 'transparent' }}
            />
          ) : (
            <div className="mt-5"></div>
          )}

          <FileUpload
            name="demo[]"
            multiple
            accept="image/*"
            maxFileSize={1000000}
            emptyTemplate={
              <p className="m-0">Drag and drop images to here to upload.</p>
            }
            chooseLabel="Photo"
            customUpload
            uploadHandler={handleUploadImage}
          />

          <Button label="Sign up" className="w-full mt-5" type="submit" />
        </form>
      </StyledFormContainer>
    </>
  );
};

export default RegisterPage;
