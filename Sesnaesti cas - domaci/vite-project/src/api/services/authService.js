import api from "../axios";

export const register = (userData) => {
	return api.post("/auth/register", userData);
};

export const login = ({ email, password }) => {
	return api.post("/auth/login", { email, password });
};

export const logout = ({ email }) => {
	return api.post("/auth/logout", { email });
};
