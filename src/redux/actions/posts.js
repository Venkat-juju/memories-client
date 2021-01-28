import * as api from '../api';
import * as ActionTypes from '../constants/ActionTypes.js';

// Action Creators
// action creators are functions that returns actions

export const getPosts = () => async(dispatch) => {
	try {
		const { data } = await api.fetchPosts();

		dispatch({type: ActionTypes.FETCH_ALL, payload: data});

	} catch(err) {
		console.log(err.message);
	}
};

export const createPost = (post) => async(dispatch) => {
	try {
		const { data } = await api.createPost(post); 

		dispatch({ type: ActionTypes.CREATE_POST, payload: data});
		
	} catch(err) {
		console.log(err);
	}
}

export const updatePost = (id, post) => async(dispatch) => {
	try {
		console.log("To be updated: ", post);
		const  { data } = await api.updatePost(id, post);
		console.log("Updated data :", data);
		dispatch({type: ActionTypes.UPDATE, payload: data})
	} catch(err) {
		console.log(err);
	}
}

export const deletePost = (id) => async(dispatch) => {
	try {
		await api.deletePost(id);

		dispatch({ type: ActionTypes.DELETE, payload: id});
	} catch (err) {
		console.log(err);
	}
};