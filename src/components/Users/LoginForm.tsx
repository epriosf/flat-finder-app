import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/firebase';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import './../../custompanel.css';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await loginUser(email, password);
      navigate('/');
      console.log('Logged in user:', user);
    } catch (error) {
      console.error('Error logging in user:', error);
    }
  };

  return (
    <div className="w-24rem">
      <h2>Login</h2>
      <div className="card flex flex-column justify-content-center w-24rem gap-5 ">
        {/* Email */}
        <FloatLabel>
          <IconField iconPosition="left" className="w-full">
            <InputIcon className="pi pi-at"> </InputIcon>

            <InputText
              id="email"
              value={email}
              className="w-full"
              color="var(--primary-color)"
              onChange={(e) => setEmail(e.target.value)}
            />
          </IconField>
          <label htmlFor="email" className="left-3">
            Email
          </label>
        </FloatLabel>

        {/* Password */}
        <FloatLabel>
          <IconField iconPosition="left" className="w-full">
            <InputIcon className="pi pi-lock"> </InputIcon>
            <Password
              id="password"
              value={password}
              className="w-full"
              color="var(--primary-color)"
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
              toggleMask
            />
          </IconField>
          <label htmlFor="password" className="left-3">
            Password
          </label>
        </FloatLabel>
        {/* Button */}
        <Button
          label="Log In"
          onClick={handleLogin}
          className="w-full"
          color="var(--indigo-400)"
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
