import React, { useEffect, useState } from 'react';
import { Avatar, Box, Link, TextField, Button, Alert, CircularProgress } from '@mui/material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import '../CSS/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';


function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading,setIsLoading] = useState(false);


  useEffect(() => {
    if(localStorage.getItem('user')){
      navigate('/');
    }
  },[errorMessage]);


  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(config.apiEndpoint+'/users/register', {
        "name": name,
        "email" : email,
        "phone": phone,
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
    setIsLoading(false);
  }


  return (
    <div className='login'>
      <Avatar className="login__avatar">
        <VpnKeyIcon />
      </Avatar>
      <h1 className='login__head'>Sign up</h1>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
          margin="normal"
          required
          fullWidth
          label="Name"
          type="text"
          autoFocus
          value={name}
          onChange={e => setName(e.target.value)}
        />
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
          label="Phone number"
          type="text"
          autoFocus
          value={phone}
          onChange={e => setPhone(e.target.value)}
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
          {!isLoading? "Sign Up": <CircularProgress color="inherit" /> }
          
        </Button>
        <div className='login__forgot'>
          
          <Link href="/login" variant="body2">
            <u>Already have an account? Login Here</u>
          </Link>
        </div>

        <div className='login__error'> 
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </div>
      </Box>
    </div>
  )
}

export default Register
