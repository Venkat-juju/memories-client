import React, { useState, useEffect } from 'react';
import { Container, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';

function Alert(props) {
    return <MuiAlert elevatio={6} variant="filled" { ...props } />;
}

const App = () => {

	
    const [errOpen, setErrOpen] = useState(false);
    const err = useSelector((state) => state.authReducer.err);

    useEffect(() => {
		if (err) {
			setErrOpen(true);
		}
    },[err]);
	
    function handleErrClose() {
        setErrOpen(false);
    }

	return (
		<BrowserRouter>
			<Container maxwidth="lg">
				<Navbar />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/signin" exact component={SignIn} />
				</Switch>
                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} open={errOpen} autoHideDuration={3000} onClose={handleErrClose}>
                    <Alert onClose={handleErrClose} severity="info">
                        {err}
                    </Alert>
                </Snackbar>
			</Container>
		</BrowserRouter>
	);	
}

export default App;