import { postTransformer } from '../transformers';

export const getPosts = async (page, limit) => {
	const res = await fetch(`http://localhost:3000/posts?_page=${page}&_limit=${limit}`);
	const [posts, links] = await Promise.all([res.json(), res.headers.get('Link')]);

	return { posts: posts && posts.map(postTransformer), links };
};
