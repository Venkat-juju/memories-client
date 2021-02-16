import React, { useState } from 'react';
import { Avatar, Container, Paper, Typography, Grid, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles.js';
import Input from './Input';
import Icon from './Icon';
import { signin, signup } from '../../redux/actions/auth';
import { AUTH_FAILED } from '../../redux/constants/ActionTypes.js';

const initialFormData = {firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignIn = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialFormData);

    const dispatch = useDispatch();
    const history = useHistory();

    const classes = useStyles();
    
    function handleSubmit(e) {
        e.preventDefault();

        if (isSignUp) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleShowPassword() {
        setShowPassword((prevShowPassword) => !prevShowPassword);
        return;
    } 

    function switchMode() {
        return setIsSignUp((prevSignUp) => !prevSignUp);
    }
    
    async function googleSuccess(res) {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type: 'AUTH_SUCCESS', data: {result, token}});
            history.push('/');
        } catch(err) {
            console.log("AUTH_FAILED: ", err);
        }

    }

    const googleFailure = () => {
        dispatch({ type: AUTH_FAILED, data: "Google login unsuccessful" });
    }

    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={3} className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h6">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                        isSignUp && (
                            <>
                                <Input name="firstName" handleChange={handleChange} half label="First Name" autoFocus type="text" />
                                <Input name="lastName" handleChange={handleChange} half label="Last Name" type="text" />
                            </>
                        )}
                        <Input name="email" autoFocus={isSignUp ? false : true} handleChange={handleChange} label="Email" type="email" fullWidth/>
                        <Input name="password" label="Password" type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} handleChange={handleChange} fullWidth/>
                        {isSignUp && (
                            <Input name="confirmPassword" label="Retype Password" type="password" handleChange={handleChange} fullWidth />
                        )}
                        {/*<Input name="password" handleChange={handleChange} label="Password" type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />*/}
                    </Grid>
                    <Button type="submit" fullWidth color="primary" variant="contained" className={classes.submit}>{isSignUp ? "Sign Up" : "Sign In"}</Button>
                </form>
                <GoogleLogin clientId="657050518749-15g2fqub1ardqkalsmecdicbqj47vacn.apps.googleusercontent.com" render={(renderProps) => (<Button className={classes.googleButton} color="primary" onClick={renderProps.onClick} disabled={renderProps.disabled} fullWidth variant="contained" startIcon={<Icon />}>Google Sign In</Button>)} onSuccess={googleSuccess} onFailure={googleFailure} cookiePolicy="single_host_origin" />
                <Grid container justify="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default SignIn;