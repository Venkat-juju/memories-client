import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import useStyles from './styles.js';
import { LOGOUT } from '../../redux/constants/ActionTypes.js';

const Navbar = () => {
    const classes = useStyles();
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const token = user?.token;
        
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 > new Date().getTime()) {
                handleLogout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const handleLogout = async () => {
        
        try {
            dispatch({type: LOGOUT, data: null});
            history.push('/signin');
            setUser(null);
        } catch (err) {
            console.log(err);
        }
    };
    console.log(user);
    return (
        <AppBar position="static" className={classes.appBar} color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" variant="h2" align="center" className={classes.heading}>Memories</Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography variant="h6" className={classes.userName}>{user.result.name}</Typography>
                        <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
                    </div>
                ) : (
                    <Button variant="contained" color="primary" component={Link} to="/signin">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;