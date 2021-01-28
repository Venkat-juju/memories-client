import React, { useState, useEffect } from 'react';
import { Typography, Paper, TextField, Button } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../redux/actions/posts';

const Form = ({ currentId, setCurrentId }) => {

	const [ postData, setPostData ] = useState({ creator: '', title: '', message:'', tags:'', selectedFiles:'' })
	const post = useSelector((state) => state.posts.find((p) => p._id === currentId));
	const classes = useStyles();

	const dispatch = useDispatch();

	useEffect(() => {
		if(post) setPostData(post);
	}, [post]);

	console.log(currentId);
	console.log(postData);
	
	const handleSubmit = (e) => {
		e.preventDefault();

		if(!currentId) {
			dispatch(createPost(postData));
		} else {
			dispatch(updatePost(currentId, postData));
		}

		clear();
	};

	const clear = () => {
		setCurrentId(null);
		setPostData({ creator: '', title: '', message:'', tags:'', selectedFiles:'' });
	};

	return (
		<Paper className={classes.paper}>
			<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
				<Typography variant="h6"> {currentId ? 'Editing' : 'Creating'} a Memory</Typography>
				<TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({...postData, creator: e.target.value })} />
				<TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
				<TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange = {(e) => setPostData({ ...postData, message: e.target.value })} />
				<TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange= {(e) => setPostData({ ...postData, tags: e.target.value.split(',')})} />
				<div className= {classes.fileInput}>
					<FileBase className={classes.fileInput} type="file" multiple={false} onDone={ ({ base64 }) => setPostData({ ...postData, selectedFiles: base64})} />
				</div> 
				<Button color="primary" className={classes.buttonSubmit} variant="contained" size="large" type="submit" fullWidth>Submit</Button>
				<Button color="secondary" variant="contained" size="small" onClick={clear} fullWidth>Clear</Button> 
			</form> 
		</Paper>
	);
}

export default Form;