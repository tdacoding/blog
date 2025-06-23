import { getComments, getPosts } from '../api';

export const fetchPosts = async () => {
	try {
		const posts = await getPosts();
		const newPosts = await Promise.all(
			posts.map(async (post) => {
				const comments = await getComments(post.id);

				return { ...post, commentsCount: comments.length };
			}),
		);

		return {
			error: null,
			res: newPosts,
		};
	} catch (error) {
		return error;
	}
};
