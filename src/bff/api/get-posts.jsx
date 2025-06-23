import { postTransformer } from '../transformers';

export const getPosts = async () => {
	const res = await fetch('http://localhost:3000/posts');
	const posts = await res.json();
	return posts && posts.map(postTransformer);
};
