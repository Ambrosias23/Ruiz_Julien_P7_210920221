import Button from '../components/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function login() {
  const token = localStorage.getItem('TOKEN');
  const isLoggedIn = token === null ? false : true;

  useEffect(() => {
    if (isLoggedIn && token != null) {
      navigate(`/`);
    }
  }, []);

  const [inputEmail, setInputEmail] = useState({ email: '' });
  const [inputPassword, setInputPassword] = useState({ password: '' });
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const regExEmail = (value) => {
      return /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    };

    if (!regExEmail(inputEmail)) {
      return setOpenSnackBar(true);
    }

    const regExPassword = (value) => {
      return /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,100}$/.test(value);
    };

    if (!regExPassword(inputPassword)) {
      return setOpenSnackBar(true);
    }
    fetch(
      'http://localhost:3000/api/auth/login',

      {
        method: 'POST',
        body: JSON.stringify({
          email: inputEmail,
          password: inputPassword
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        console.log('Vous avez réusie à vous connecter');
        return res.json();
      })

      .then((data) => {
        if (data) {
          navigate('/');
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('TOKEN', data.token);
          localStorage.setItem('admin', data.admin);
        }

        if (!data.userId) {
          setOpenSnackBar(true);
          localStorage.clear();
          navigate('/login');
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  function handleSnackBar() {
    return (
      <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={() => setOpenSnackBar(false)}>
        <Alert severity="error">
          Veuillez vérifier votre email ou votre mot de passe (1 majuscule, 1 minuscule, 2 chiffres,
          6 caractéres min à 100 max).
        </Alert>
      </Snackbar>
    );
  }
  return (
    <div className="signinPage">
      <h1>Login</h1>
      <form className="signin" onSubmit={handleSubmit}>
        <label htmlFor="Mail">Email :</label>
        <input
          type="text"
          id="Mail"
          name="Mail"
          required
          size="10"
          onChange={(e) => setInputEmail(e.target.value)}
          value={inputEmail.email}
          placeholder="Email"
        />

        <label htmlFor="Password">Password :</label>
        <input
          type="password"
          id="Password"
          name="password"
          required
          size="10"
          onChange={(e) => setInputPassword(e.target.value)}
          value={inputPassword.password}
          placeholder="Password"
        />
        <Button buttonName="Signin" />
      </form>
      {handleSnackBar()}
    </div>
  );
}
