import React from 'react';
import '../CSS/User.css';
import { Avatar, List, ListItem, ListItemText } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';

function User({ phone, email, name, habits }) {

    return (
        <div className="user">
            <div className="user__content">
                <div className="user__image">
                    <Avatar className="user__avatar"
                        sx={{ width: 100, height: 100 }} />
                </div>
                <div className="user__about">
                    <div className='user__name'>
                        <h2>{name}</h2>

                    </div>
                    <div className='user_sides'>
                        <div className='user__details'>
                            <p>
                                <MailIcon className='user__icons' />
                                <span>
                                    {email}
                                </span>
                            </p>
                            <p>
                                <PhoneIcon className='user__icons' />
                                <span>
                                    {phone}
                                </span>
                            </p>
                        </div>
                        <div className='user__habits'>
                            <List
                                sx={{
                                    width: '100%',
                                    maxWidth: 360,
                                    height: 200,
                                    bgcolor: 'background.paper',
                                    position: 'relative',
                                    overflow: 'auto',
                                    maxHeight: 300,
                                    '& ul': { padding: 0 },
                                    textAlign: 'center',
                                }}
                                subheader={<li />}
                            >
                                <h3>Habits</h3>
                                {habits.map((habit, id) => (
                                    <ListItem key={id}>
                                        <ListItemText primary={habit} />
                                    </ListItem>
                                ))}
                            </List>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default User;
