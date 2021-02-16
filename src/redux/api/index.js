import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000'});
//const url = "https://mems-project.herokuapp.com/posts";   // production server
//const url = "http://localhost:5000/posts";                  // development server

// populating the authorization header
API.interceptors.request.use((req) => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    if (profile) {
        req.headers.Authorization = `Bearer ${profile?.token.toString()}`
    }

    return req;
}); 

// related to posts
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post(`/users/signin`, formData);
export const signUp = (formData) => API.post(`/users/signup`, formData);
