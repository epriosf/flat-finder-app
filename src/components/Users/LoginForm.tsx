import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useAuth } from '../../hooks/useAuth';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Message } from 'primereact/message';
import React, { useState } from 'react';

const SignupSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email Required'),
  password: Yup.string().required('Password Required').min(6),
});

export interface UserLogin {
  email: string;
  password: string;
}
export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginError, setLoginError] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const user = await login(formik.values.email, formik.values.password);
        if (user) {
          navigate('/');
          console.log('Logged in user:', user);
          setLoginError(false);
        } else {
          console.error('Error logging in user:', user);
          setLoginError(true);
        }
      } catch (error) {
        console.error('Error logging in user:', error);
        setLoginError(true);
      }
    },
  });

  return (
    <div className="w-24rem">
      <h2 className="text-center">Welcome back!</h2>
      <div className="card flex flex-column justify-content-center w-24rem gap-5 text-500 mt-5">
        <form id="loginForm" onSubmit={formik.handleSubmit}>
          {/* Display general error message after submission if login fails */}
          {loginError && (
            <Message
              severity="error"
              text="Incorrect email or password."
              className="mb-5 w-full justify-content-start text-pink-300 bg-indigo-800"
            />
          )}
          {/* Email */}
          <FloatLabel>
            <IconField iconPosition="left" className="w-full text-500">
              <InputIcon className="pi pi-at text-500"> </InputIcon>

              <InputText
                id="email"
                value={formik.values.email}
                className="w-full bg-white "
                onChange={formik.handleChange}
                name="email"
              />
            </IconField>
            <label htmlFor="email" className="left-3 text-400">
              Email
            </label>
          </FloatLabel>
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

          {/* Password */}
          <FloatLabel>
            <IconField iconPosition="left" className="w-full">
              <InputIcon className="pi pi-lock text-500"> </InputIcon>
              <Password
                id="password"
                value={formik.values.password}
                className="w-full text-500"
                onChange={formik.handleChange}
                name="password"
                feedback={false}
                toggleMask
              />
            </IconField>
            <label htmlFor="password" className="left-3 text-400">
              Password
            </label>
          </FloatLabel>
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
          {/* Button */}
          <Button
            label="Log In"
            type="submit"
            className="w-full bg-indigo-500 text-white"
          />
        </form>
        {/* <Toast ref={toast} position="bottom-left" /> */}
        {/* <div className="card flex justify-content-center">
        </div> */}
      </div>
    </div>
  );
};
