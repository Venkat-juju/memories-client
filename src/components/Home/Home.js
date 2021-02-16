import React,{ useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useStyles from './styles.js';
import { Grow, Grid, Container } from '@material-ui/core';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import { getPosts } from '../../redux/actions/posts';

const Home = () => {

    const [currentId, setCurrentId] = useState(null);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts())
	}, [currentId, dispatch])

    const classes = useStyles();
    return (
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
    );
};

export default Home;