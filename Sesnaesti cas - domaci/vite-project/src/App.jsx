// import { useEffect, useState } from "react";
// import axios from "axios";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PostPage } from "./pages/PostPage";
import { CreateEditPage } from "./pages/CreateEditPage";
import { UserProfile } from "./pages/UserProfile";

function App() {
	// const [users, setUsers] = useState([]);

	// useEffect(() => {
	// 	axios
	// 		.get("http://localhost:3000/users", {})
	// 		.then((res) => setUsers(res.data))
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/home" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/*" element={<NotFoundPage />} />
				<Route path="/post" element={<PostPage />} />
				<Route path="/create" element={<CreateEditPage />} />
				<Route path="/profile" element={<UserProfile />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
