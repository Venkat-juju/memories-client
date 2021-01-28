import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';

import Post from './Post/Post';
import makeStyles from './styles';

const Posts = ({ setCurrentId }) => {

	const classes = makeStyles();
	const posts = useSelector((state) => state.posts);

	console.log(posts);
	
	return (
		!posts.length ? <CircularProgress /> : (
			<Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
				{posts.map((post) => (
					<Grid key={post._id} item xs={12} sm={6}>
						<Post setCurrentId={setCurrentId} post={post} />
					</Grid>
				))}
			</Grid>
		)
	);
}

export default Posts;