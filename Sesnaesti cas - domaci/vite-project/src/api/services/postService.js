import api from "../axios";

export const createPost = (postData) => {
	return api.post("/posts/", postData);
};

export const fetchPosts = (postData) => {
	return api.get("/posts/", postData);
};
