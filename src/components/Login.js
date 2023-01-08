import React, { useEffect, useState } from 'react';
import { Avatar, Box, Link, TextField, Button, Alert, CircularProgress } from '@mui/material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import '../CSS/Login.css';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading,setIsLoading] = useState(false);



  useEffect(() => {
    if(localStorage.getItem('user')){
      navigate('/');
    }
  },[errorMessage]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await axios.post(config.apiEndpoint+'/users/login', {
        "email" : email,
        "password": password
      })

      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      setErrorMessage(null);
      navigate('/');

    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message)
      } else {
        throw error;
      }
      
    }
    setIsLoading(false)

  }


  return (
    <div className='login'>
      <Avatar className="login__avatar">
        <VpnKeyIcon />
      </Avatar>
      <h1 className='login__head'>Sign in</h1>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email"
          type="email"
          autoFocus
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
       
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className='login__button'
        >
          {!isLoading? "Sign In": <CircularProgress color="inherit" /> }
        </Button>
        <div className='login__forgot'>
          
          <Link href="/register" variant="body2">
            <u>Don't have an account? Register Here</u>
          </Link>
        </div>

        <div className='login__error'> 
          {errorMessage && <Alert  severity="error">{errorMessage}</Alert>}
        </div>
      </Box>
    </div>
  )
}

export default Login
