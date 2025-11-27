import api from "../axios";

export const getUser = (userId) => {
	return api.get(`/auth/me/${userId}`);
};
