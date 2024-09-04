import { Timestamp } from 'firebase/firestore';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import { FloatLabel } from 'primereact/floatlabel';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import { Message } from 'primereact/message';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import GeneralInput from '../components/Commons/Inputs/GeneralInput';
import PasswordInput from '../components/Commons/Inputs/PasswordInput';
import { User } from '../components/Interfaces/UserInterface';

import { Image } from 'primereact/image';

import {
  registerUserWithAuth,
  registerUserWithFirestore,
  uploadProfileImage,
} from '../services/firebase';

//Min and Max Dates
const today = new Date();
let minDate = new Date(today);
let maxDate = new Date(today);

//User Type
export interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: Date;
  profile: string;
  isAdmin: boolean;
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
interface RegisterPageProps {
  mode: string;
  userUpdate: User | null;
  isAdminister: boolean;
}

const RegisterPage = ({
  mode = 'register',
  userUpdate,
  isAdminister = false,
}: RegisterPageProps) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(
    isAdminister && mode === 'edit' ? true : false,
  );
  const navigate = useNavigate();
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const formik = useFormik({
    initialValues: {
      firstName: userUpdate?.firstName || '',
      lastName: userUpdate?.lastName || '',
      email: userUpdate?.email || '',
      birthday: userUpdate?.birthday
        ? userUpdate.birthday instanceof Timestamp
          ? userUpdate.birthday.toDate()
          : userUpdate.birthday
        : null,
      password: '',
      passwordConfirm: '',
      isAdmin: userUpdate?.isAdmin || isAdmin,
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { resetForm }) => {
      let imageUrl = '';

      try {
        if (profileFile) {
          imageUrl = await uploadProfileImage(profileFile);
        }
        const user: UserRegister = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          birthday: values.birthday ? values.birthday : new Date(today),
          password: values.password,
          profile: imageUrl || userUpdate?.profile || '',
          isAdmin: false,
        };

        if (mode === 'register') {
          const userCredential = await registerUserWithAuth(
            user.email,
            user.password,
          );
          await registerUserWithFirestore(userCredential.uid, {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            birthday: user.birthday,
            profile: user.profile,
            isAdmin: user.isAdmin,
          });
          console.log('User Register Succesfully');
          resetForm();
          setProfileFile(null);
          navigate('/login');
        } else if (mode === 'edit') {
          //Anadir logica para editar usuario en firebase
          console.log('User Updated Successfully');
          navigate('/profile');
        }
      } catch (error) {
        console.error('Error registering user:', error);
      }
    },
  });

  const handleBirthdayChange = (
    field: string,
    value: Date | Date[] | undefined,
  ) => {
    const date =
      value instanceof Date ? value : Array.isArray(value) ? value[0] : null;
    formik.setFieldValue(field, date);
  };

  const handleUploadImage = async (e: FileUploadHandlerEvent) => {
    const file = e.files[0];
    setProfileFile(file);
  };

  return (
    <>
      <form id="newFlatForm" onSubmit={formik.handleSubmit}>
        {mode === 'edit' && (
          <div className="flex justify-content-center mb-4">
            <Image src={userUpdate?.profile} alt="userProfile" width="150" />
          </div>
        )}

        <GeneralInput
          id="firstName"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          iconClass="pi pi-user text-500"
          label="FirstName"
          type="text"
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <Message
            severity="error"
            text={formik.errors.firstName}
            className="mb-1 w-full justify-content-start text-pink-300"
            style={{ backgroundColor: 'transparent' }}
          />
        ) : (
          <div className="mt-5"></div>
        )}

        <GeneralInput
          id="lastName"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          iconClass="pi pi-user text-500"
          label="LastName"
          type="text"
        />

        {formik.touched.lastName && formik.errors.lastName ? (
          <Message
            severity="error"
            text={formik.errors.lastName}
            className="mb-1 w-full justify-content-start text-pink-300"
            style={{ backgroundColor: 'transparent' }}
          />
        ) : (
          <div className="mt-5"></div>
        )}

        <GeneralInput
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          iconClass="pi pi-envelope text-500"
          label="Email"
          type="email"
          disabled={mode === 'edit'}
        />

        {formik.touched.email && formik.errors.email ? (
          <Message
            severity="error"
            text={formik.errors.email}
            className="mb-1 w-full justify-content-start text-pink-300"
            style={{ backgroundColor: 'transparent' }}
          />
        ) : (
          <div className="mt-5"></div>
        )}
        <FloatLabel>
          <IconField iconPosition="left">
            <InputIcon className="pi pi-calendar text-500"> </InputIcon>
            <Calendar
              id="birth_date"
              value={formik.values.birthday}
              onChange={(e) =>
                handleBirthdayChange('birthday', e.value as Date | undefined)
              }
              minDate={minDate}
              maxDate={maxDate}
              dateFormat="dd/mm/yy"
              className="w-full"
            />
          </IconField>
          <label htmlFor="birth_date" className="left-3 text-400">
            Birthday
          </label>
        </FloatLabel>

        {/* <FloatLabel>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-calendar text-500"></i>
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
          <label htmlFor="birth_date" className="left-3 text-400">
            Birth Date
          </label>
        </FloatLabel> */}
        {formik.touched.birthday && formik.errors.birthday ? (
          <Message
            severity="error"
            text={formik.errors.birthday}
            className="mb-1 w-full justify-content-start text-pink-300"
            style={{ backgroundColor: 'transparent' }}
          />
        ) : (
          <div className="mt-5"></div>
        )}
        <PasswordInput
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          iconClass="pi pi-lock text-500"
          label="password"
          disabled={mode === 'edit'}
        />
        {formik.touched.password && formik.errors.password ? (
          <Message
            severity="error"
            text={formik.errors.password}
            className="mb-1 w-full justify-content-start text-pink-300"
            style={{ backgroundColor: 'transparent' }}
          />
        ) : (
          <div className="mt-5"></div>
        )}
        <PasswordInput
          id="passwordConfirm"
          name="passwordConfirm"
          value={formik.values.passwordConfirm}
          onChange={formik.handleChange}
          iconClass="pi pi-lock text-500"
          label="password confirm"
          disabled={false}
        />
        {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
          <Message
            severity="error"
            text={formik.errors.passwordConfirm}
            className="mb-1 w-full justify-content-start text-pink-300"
            style={{ backgroundColor: 'transparent' }}
          />
        ) : (
          <div className="mt-5"></div>
        )}
        {mode === 'edit' && isAdmin && (
          <>
            <div className="mt-3">
              <InputSwitch
                checked={isAdmin}
                onChange={(e: InputSwitchChangeEvent) => setIsAdmin(e.value)}
                className="mr-3"
              />
              <span>Is Admin</span>
            </div>
          </>
        )}

        <FileUpload
          name="demo[]"
          multiple={false}
          accept="image/*"
          maxFileSize={1000000}
          emptyTemplate={
            <p className="m-0">Drag and drop images to here to upload.</p>
          }
          chooseLabel={mode === 'edit' ? 'Update Photo' : 'Photo'}
          customUpload
          auto
          uploadHandler={handleUploadImage}
        />

        <Button
          label={mode === 'register' ? 'Sign up' : 'Save Changes'}
          className="w-full mt-5"
          type="submit"
        />
      </form>
    </>
  );
};

export default RegisterPage;
