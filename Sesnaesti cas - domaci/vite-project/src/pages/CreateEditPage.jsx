import "../styles/CreateEditPage.css";
import { createPost } from "../api/services/postService";
import { useState } from "react";

export const CreateEditPage = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const newPost = async (e) => {
		e.preventDefault();
		try {
			const post = await createPost({ title, description });
			setTitle("");
			setDescription("");
			console.log("Uspesna objava", post.data);
		} catch (err) {
			console.log("Greska prilikom objave", err);
		}
	};
	return (
		<form onSubmit={newPost} className="createDiv">
			<h1 className="createHeader">Create post</h1>
			<p className="createText">Title:</p>
			<input
				className="createTitleInput"
				placeholder="A page from my diary..."
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
			<p className="createText">Description:</p>
			<textarea
				className="createDescInput"
				placeholder="Today happened something bizzare..."
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				required
			/>
			<button type="submit" className="createButton">
				Create Post
			</button>
		</form>
	);
};
