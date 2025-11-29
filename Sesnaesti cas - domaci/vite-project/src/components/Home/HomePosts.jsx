import "../../styles/HomePage.css";
import { fetchPosts } from "../../api/services/postService";
import { useEffect, useState } from "react";

export const HomePosts = () => {
	const [post, setPost] = useState([]);
	useEffect(() => {
		const getPosts = async () => {
			try {
				const posts = await fetchPosts();
				console.log("Uspenso ucitavanje postova", posts.data);
				setPost(posts.data);
			} catch (err) {
				console.log("Greska prilikom prikazivanja postova", err);
			}
		};
		getPosts();
	}, []);
	return (
		<div>
			<h1 className="postHeader">
				Svi postovi<span>({post.length})</span>
			</h1>
			<div className="postContainer">
				{post.map((el, index) => {
					return (
						<div key={index} className="postDiv">
							<h1 className="postTitle">{el.title}</h1>
							<p className="postDesc">{el.description}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};
