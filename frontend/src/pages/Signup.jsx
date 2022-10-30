import React from "react";
import Button from "../components/Button";
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
 
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
export default function Signup() {

    const [inputEmail, setInputEmail] = useState({email: ""});
    const [inputPassword, setInputPassword] = useState({password: ""});
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const navigate = useNavigate();
   
    const handleSubmit = (e) => {
      e.preventDefault();

      const regExEmail = (value) => {
        return /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      }

      if(!regExEmail(inputEmail)){
        return setOpenSnackBar(true);
      } 
      
      const regExPassword = (value) => {
        return /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,100}$/.test(value);
      }

      if(!regExPassword(inputPassword)){
        return setOpenSnackBar(true);
      } 

      fetch('http://localhost:3000/api/auth/signup', 

      {
        method: 'POST',
        body: JSON.stringify({
          email: inputEmail,
          password: inputPassword,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      .then(responce => {
        console.log('Vous avez réusie à vous inscrire');
        return responce.json();
      })

      .then(data => {
        console.log(data);

        if (data) {
          navigate('/login');
        } 

        if (!data.message) {
          setOpenSnackBar(true)
          navigate('/api/auth/signup')
        }
      })

      .catch(error => {
        console.log(error);
      })
      
    };

    function handleSnackBar(){
      return(
          <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={() => setOpenSnackBar(false)}>
              <Alert severity= "error">Veuillez vérifier votre email ou votre mot de passe (1 majuscule, 1 minuscule, 2 chiffres, 6 caractéres min à 100 max).</Alert>
          </Snackbar>
      )
    }
    
    return (
        <div className="signupPage">
            <h1>Signup</h1>
            <form className="signup" onSubmit={handleSubmit}>
                <label htmlFor="Mail">Email :</label>
                <input  
                        onChange={e => setInputEmail(e.target.value)} 
                        value={inputEmail.email} 
                        type="text" 
                        id="Mail" 
                        name="Mail"
                        required
                        size="10"
                        placeholder="Email"/>
                <label htmlFor="Password">Password :</label>
                <input 
                    type="text" 
                    id="Password" 
                    name="password" 
                    required 
                    size="10"
                    onChange={e => setInputPassword(e.target.value)} 
                    value={inputPassword.password}
                    placeholder="Password"/>
                <Button
                type='submit'
                buttonName="S'inscrire"/>
            </form>
            {handleSnackBar()}
        </div>
    )
}
