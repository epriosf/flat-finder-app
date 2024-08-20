import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import './../../custompanel.css';
import { useAuth } from '../../hooks/useAuth';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const user = await login(email, password);
      navigate('/');
      console.log('Logged in user:', user);
    } catch (error) {
      console.error('Error logging in user:', error);
    }
  };

  return (
    <div className="w-24rem">
      <h2 className="text-center">Welcome back!</h2>
      <div className="card flex flex-column justify-content-center w-24rem gap-5 text-500 mt-5">
        {/* Email */}
        <FloatLabel>
          <IconField iconPosition="left" className="w-full text-500">
            <InputIcon className="pi pi-at text-500"> </InputIcon>

            <InputText
              id="email"
              value={email}
              className="w-full bg-white "
              onChange={(e) => setEmail(e.target.value)}
            />
          </IconField>
          <label htmlFor="email" className="left-3 text-400">
            Email
          </label>
        </FloatLabel>

        {/* Password */}
        <FloatLabel>
          <IconField iconPosition="left" className="w-full">
            <InputIcon className="pi pi-lock text-500"> </InputIcon>
            <Password
              id="password"
              value={password}
              className="w-full text-500"
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
              toggleMask
            />
          </IconField>
          <label htmlFor="password" className="left-3 text-400">
            Password
          </label>
        </FloatLabel>
        {/* Button */}
        <Button
          label="Log In"
          onClick={handleLogin}
          className="w-full bg-indigo-500 text-white"
        />
      </div>
      {/* <br />
      <br />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button> */}
    </div>
  );
};
