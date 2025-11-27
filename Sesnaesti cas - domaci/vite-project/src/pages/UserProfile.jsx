import "../styles/UserProfile.css";
import { getUser } from "../api/services/userService";
import { useEffect, useState } from "react";

export const UserProfile = () => {
	const [user, setUser] = useState({});
	useEffect(() => {
		const localUser = JSON.parse(localStorage.getItem("user"));

		const fetchUser = async (id) => {
			try {
				const response = await getUser(id);

				setUser(response.data);
			} catch (err) {
				console.log("Greska", err);
			}
		};

		fetchUser(localUser._id);
	}, []);

	return (
		<div className="profilePage">
			<div className="profileDiv">
				<p>Name: {user.name}</p>
				<p>Email: {user.email}</p>
			</div>
		</div>
	);
};
