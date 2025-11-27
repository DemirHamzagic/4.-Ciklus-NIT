import "../styles/RegisterPage.css";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../api/services/authService";
import { useState } from "react";

export const RegisterPage = () => {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [messageError, setMessageError] = useState("");
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			const response = await register({ name, password, email });
			console.log("Uspesna registracija", response.data);

			setName("");
			setPassword("");
			setEmail("");
			navigate("/login");
		} catch (err) {
			console.log("Neuspesna forma", err);
			setMessageError("Pokusaj ponovo");
		}
	};
	return (
		<div className="registerPage">
			<form onSubmit={handleRegister} className="registerForm">
				<h1 className="registerTitle">Register</h1>
				<p className="inputHeader">Name</p>
				<input
					className="registerNameInput"
					type="text"
					placeholder="Name..."
					required
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<p className="inputHeader">Password</p>
				<input
					className="registerPasswordInput"
					type="password"
					placeholder="Password..."
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<p className="inputHeader">Email</p>
				<input
					className="registerEmailInput"
					type="text"
					placeholder="Email..."
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button type="submit" className="registerButton">
					Register
				</button>
				<p className="registerFailedText">{messageError}</p>
				<Link className="registerLink" to={"/login"}>
					Imas nalog? Uloguj se
				</Link>
			</form>
		</div>
	);
};
