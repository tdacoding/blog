import { postTransformer } from '../transformers';

export const getPost = async (postId) => {
	const res = await fetch(`http://localhost:3000/posts/${postId}`);
	const post = await res.json();

	return post && postTransformer(post);
};
