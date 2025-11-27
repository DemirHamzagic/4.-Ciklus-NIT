import "../styles/CreateEditPage.css";
export const CreateEditPage = () => {
	return (
		<div className="createDiv">
			<h1 className="createHeader">Create post</h1>
			<p className="createText">Title:</p>
			<input
				className="createTitleInput"
				placeholder="A page from my diary..."
			/>
			<p className="createText">Description:</p>
			<textarea
				className="createDescInput"
				placeholder="Today happened something bizzare..."
			/>
			<button className="createButton">Create Post</button>
		</div>
	);
};
