import * as ActionTypes from '../constants/ActionTypes.js';

const posts = (posts = [], action) => {
	switch(action.type) {
		case ActionTypes.FETCH_ALL:
			return action.payload;
		case ActionTypes.CREATE_POST:
			return [...posts, action.payload];
		case ActionTypes.UPDATE:
			console.log(action.payload);
			return posts.map((p) => p._id === action.payload._id ? action.payload : p);
		case ActionTypes.DELETE:
			return posts.filter((post) => post._id !== action.payload);
		default:
			return posts;
	}
}

export default posts;