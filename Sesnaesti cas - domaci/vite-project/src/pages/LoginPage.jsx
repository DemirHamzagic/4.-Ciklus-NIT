import "../styles/LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/services/authService";
import { useState } from "react";

export const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const navige = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			console.log(email, password);
			const response = await login({ email, password });

			localStorage.setItem("accessToken", response.data.accessToken);
			localStorage.setItem("user", JSON.stringify(response.data.user));
			console.log("Uspesan login");
			setEmail("");
			setPassword("");
			navige("/home");
		} catch (err) {
			console.log("Greska", err);
			setMessage("Unesite ispravne podatke");
		}
	};

	return (
		<div className="loginPage">
			<form onSubmit={handleLogin} className="loginForm">
				<h1 className="loginTitle">Login</h1>
				<p className="inputHeader">Email</p>
				<input
					className="loginEmailInput"
					type="text"
					placeholder="Email..."
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<p className="inputHeader">Password</p>
				<input
					className="loginPasswordInput"
					type="password"
					placeholder="Password..."
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit" className="loginButton">
					Login
				</button>
				<p className="loginFailedText">{message}</p>
				<Link className="loginLink" to={"/register"}>
					Nemate nalog? Registruj se
				</Link>
			</form>
		</div>
	);
};
