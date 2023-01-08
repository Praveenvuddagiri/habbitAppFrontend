import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, ListItemSecondaryAction, Typography, ListItem, Button, ListItemText, IconButton, Container, TextField, List } from '@mui/material';

import '../CSS/HomePage.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import config from '../config';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import '../CSS/profile.css'

function Profile() {
    const [user, setUser] = useState({
        name: 'John Smith',
        phone: '123-456-7890',
        email: 'john@example.com',
        habits: ['Exercise', 'Meditate', 'Read']
    });
    const navigate = useNavigate();
    const [userModel, setUserModel] = useState({ name: null });
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editingValue, setEditingValue] = useState('');
    const [newHabit, setNewHabit] = useState('');


    const handleEditClick = (index, value) => {
        setEditingIndex(index);
        setEditingValue(value);
    };

    const handleCancelClick = () => {
        setEditingIndex(-1);
        setEditingValue('');
    };

    const handleSaveClick = async (id) => {
        try {
            const configToken = {
                headers: {
                    Authorization: `Bearer ${userModel.token}`
                }
            };
            await axios.put(config.apiEndpoint + '/habits/' + id, {
                "text": editingValue
            }, configToken)
                .then((response) => {
                    console.log(response.data.text + " updated. ");
                })

            const newHabits = [...user.habits];
            newHabits[editingIndex].text = editingValue;
            setUser({ ...user, habits: newHabits });


        } catch (error) {
            console.error(error)
        }
        setEditingIndex(-1);
        setEditingValue('');
    };

    const handleDeleteClick = async (index, id) => {



        try {
            const configToken = {
                headers: {
                    Authorization: `Bearer ${userModel.token}`
                }
            };
            await axios.delete(config.apiEndpoint + '/habits/' + id, configToken)
                .then((response) => {
                    console.log(" Deleted.");
                })

            const newHabits = [...user.habits];
            newHabits.splice(index, 1);
            setUser({ ...user, habits: newHabits });

        } catch (error) {
            console.error(error)
        }


    };

    const handleAddClick = async () => {

        if (newHabit) {
            if (user.habits.length === 5) {
                alert("Cannot add more than 5 habits.")
                return;
            }

            try {
                let habitModel;
                const configToken = {
                    headers: {
                        Authorization: `Bearer ${userModel.token}`
                    }
                };
                await axios.post(config.apiEndpoint + '/habits/', {
                    "text": newHabit
                }, configToken)
                    .then((response) => {
                        habitModel = {
                            id: response.data._id,
                            text: response.data.text
                        }
                        alert(response.data.text + " added to habbits.");
                    })
                const newHabits = [...user.habits, habitModel];
                setUser({ ...user, habits: newHabits });
            } catch (error) {
                console.error(error)
            }
            setNewHabit('');
        }
    };

    const loadData = async () => {
        const configToken = {
            headers: {
                Authorization: `Bearer ${userModel.token}`
            }
        };
        try {
            let data;
            await axios.get(config.apiEndpoint + '/users/me', configToken)
                .then((response) => {
                    data = {
                        key: response.data._id,
                        phone: response.data.phone,
                        email: response.data.email,
                        name: response.data.name,
                        habits: [],
                    }
                })
            await axios.get(config.apiEndpoint + '/habits/', configToken)
                .then((response) => {
                    data['habits'] = response.data.map((hab) => {
                        return {
                            id: hab._id,
                            text: hab.text,
                        }

                    })
                    setUser(data);
                })

        } catch (error) {
            if (error.response.status === 401) {
                console.log(error.response.data.message)
            } else {
                throw error;
            }
        }
    }

    useEffect(() => {
        const temp = localStorage.getItem('user')
        if (!temp) {
            navigate('/login');
        }
        if (userModel.token === undefined)
            setUserModel(JSON.parse(temp))

        if (userModel.token !== undefined) {
            loadData();
        }
    }, [userModel]);


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


                    <Link to='/'><Button color="secondary" variant="contained" style={{ marginRight: 10 }}> <AccountCircleIcon /> Users </Button></Link>
                    <Button color="error" variant="contained" onClick={logout} >Logout</Button>


                </Toolbar>
            </AppBar>
            <Container fixed>
                <div className='bodySize'>

                    <form className='form'>
                        <TextField label="Name" value={user.name} disabled />
                        <TextField label="Phone" value={user.phone} disabled />
                        <TextField label="Email" value={user.email} disabled />
                    </form>
                    <List className='list'>
                        {user.habits.map((habit, index) => (
                            <ListItem key={index} className='listItem'>
                                {index === editingIndex ? (
                                    <TextField
                                        value={editingValue}
                                        onChange={(e) => setEditingValue(e.target.value)}
                                        fullWidth
                                    />
                                ) : (
                                    <ListItemText primary={habit.text} />
                                )}
                                <ListItemSecondaryAction>
                                    {index === editingIndex ? (
                                        <>
                                            <IconButton
                                                className='editButton'
                                                onClick={() => handleSaveClick(habit.id)}
                                            >
                                                <SaveIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleCancelClick()}>
                                                <CancelIcon />
                                            </IconButton>
                                        </>
                                    ) : (
                                        <>
                                            <IconButton
                                                className='editButton'
                                                onClick={() => handleEditClick(index, habit.text)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDeleteClick(index, habit.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                    <TextField
                        style={{ marginTop: 40 }}
                        label="Add Habit"
                        value={newHabit}
                        onChange={(e) => setNewHabit(e.target.value)}
                        fullWidth
                    />
                    <IconButton
                        className='addButton'
                        onClick={handleAddClick}
                        disabled={!newHabit}
                    >
                        <AddIcon />
                    </IconButton>
                </div>

            </Container>
        </div>
    );
}

export default Profile
