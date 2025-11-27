import "../styles/HomePage.css";
import { HomeNewsDiv } from "../components/Home/HomeNewsDiv";
import { HomePosts } from "../components/Home/HomePosts";
export const HomePage = () => {
	return (
		<div className="homeHeadDiv">
			<h1 className="titleHeader">BlogHive</h1>
			<h1 className="newsHeader">News from our Admin</h1>
			<div className="newsContainer">
				<HomeNewsDiv />
			</div>
			<h1 className="postHeader">
				Svi postovi<span>(67)</span>
			</h1>
			<HomePosts />
		</div>
	);
};
