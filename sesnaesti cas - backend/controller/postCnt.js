const Post = require("../models/Post");

async function getAllPosts(req, res) {
	try {
		const post = await Post.find();
		if (post.length === 0)
			return res
				.status(404)
				.json({ message: "Nijedan post nije objavljen" });
		res.json(post);
	} catch (err) {
		return res
			.status(404)
			.json({ message: "Greska prilikom prikazivanja postova" });
	}
}

async function createPost(req, res) {
	try {
		const newPost = new Post(req.body);
		newPost.author = req.user.id;
		await newPost.save();
		res.status(201).json(newPost);
	} catch (err) {
		return res
			.status(400)
			.json({ message: "Greska prilikom kreiranja posta" });
	}
}

async function getOnePost(req, res) {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) return res.status(404).json({ message: "Post ne postoji" });
		res.json(post);
	} catch (err) {
		return res
			.status(400)
			.json({ message: "Greska prilikom vracanja posta" });
	}
}

async function updatePost(req, res) {
	try {
		const post = await Post.findById(req.params.id);
		if (!post)
			return res.status(404).json({ message: "Post nije pronadjen" });

		if (post.author.toString() !== req.user.id)
			return res.status(403).json({ message: "Nemate pristup" });

		const updatedPost = await Post.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		res.status(200).json(updatedPost);
	} catch (err) {
		return res
			.status(400)
			.json({ message: "Greska prilikom azuriranja posta" });
	}
}

async function deletePost(req, res) {
	try {
		const post = await Post.findById(req.params.id);
		if (!post)
			return res.status(404).json({ message: "Post nije pronadjen" });

		if (post.author.toString() !== req.user.id)
			return res.status(403).json({ message: "Nemate pristup" });

		const deletedPost = await Post.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "Post je uspesno izbrisan" });
	} catch (err) {
		return res
			.status(400)
			.json({ message: "Greska prilikom brisanja posta" });
	}
}

module.exports = {
	getAllPosts,
	createPost,
	getOnePost,
	updatePost,
	deletePost,
};
