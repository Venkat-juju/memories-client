import React, { useEffect, useState } from 'react';
import { AppBar, Container, Grow, Grid, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import { getPosts } from './redux/actions/posts';

import makeStyle from './styles';

const App = () => {

	const [currentId, setCurrentId] = useState(null);

	const classes = makeStyle();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts())
	}, [currentId, dispatch])

	return (
		<Container maxwidth="lg">
			<AppBar position="static" className={classes.appBar} color="inherit">
				<Typography variant="h2" align="center" className={classes.heading}>Memories</Typography>
			</AppBar>
			<Grow in>
				<Container>
					<Grid container className={classes.mainContainer} justify="space-between" alignItems="stretch" spacing={3}>
						<Grid item xs={12} sm={7}>
							<Posts setCurrentId={setCurrentId} />
						</Grid>
						<Grid item xs={12} sm={4}>
							<Form currentId={currentId} setCurrentId={setCurrentId} />
						</Grid>
					</Grid>
				</Container>
			</Grow>
		</Container>
	);	
}

export default App;