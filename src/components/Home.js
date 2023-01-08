import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Container } from '@mui/material';

import '../CSS/HomePage.css';
import User from './User';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import CardSkeleton from './CardSkeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import config from '../config';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function HomePage() {
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [userModel, setUserModel] = useState({ name: null });


    const loadData = async () => {
         const configToken = {
            headers: {
                Authorization: `Bearer ${userModel.token}`
            }
        };
        
        try {
            await axios.get(config.apiEndpoint + '/habits/getAllUsers', configToken)
                .then((response) => {
                    var data = response.data.map((con) => {
                        return {
                            key: con._id,
                            phone: con.phone,
                            email: con.email,
                            name: con.name,
                            habits: con.habits
                        }
                    })
                    setUser(data);
                    setIsLoading(false);
                })
        } catch (error) {
            if (error.response.status === 401) {
                console.log(error.response.data.message)
            } else {
                throw error;
            }
        }
    }

    useEffect( () => {
        const temp = localStorage.getItem('user')
        if (!temp) {
            navigate('/login');
        }
        if(userModel.token === undefined)
            setUserModel(JSON.parse(temp))

        if(userModel.token !== undefined){
            loadData();
        }
    },[userModel]);


    const logout = () => {
        localStorage.removeItem('user');
        navigate('/login');
        
    }
    return (
        <div className='home'>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 1.5 }}
                    >
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Habit App
                    </Typography>

                    

                    <Typography variant="h5" sx={{ display: { xs: 'none', md: 'block', flexGrow: 1 } }} component="div" >
                        WELCOME {userModel.name}
                    </Typography>


                    <Link to='/profile'><Button color="secondary" variant="contained" style={{marginRight: 10}}> <AccountCircleIcon/> Profile </Button></Link>
                    <Button color="error" variant="contained" onClick={logout} >Logout</Button>
                    
                    
                </Toolbar>
            </AppBar>
            <Container fixed>
                <div className='home__user'>
                    {isLoading && <CardSkeleton cards={9} />}

                    {user.map((con) => (
                        <User
                            key={con.key}
                            phone={con.phone}
                            email={con.email}
                            name={con.name}
                            habits={con.habits}
                        />
                    ))}
                    {isLoading && <CardSkeleton cards={6} />}
                </div>
            </Container>
        </div>
    );
}

export default HomePage
