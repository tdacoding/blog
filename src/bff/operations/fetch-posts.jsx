import { getComments, getPosts } from '../api';

export const fetchPosts = async (searchPhrase, page, limit) => {
	try {
		const { posts, links } = await getPosts(searchPhrase, page, limit);
		const newPosts = await Promise.all(
			posts.map(async (post) => {
				const comments = await getComments(post.id);

				return { ...post, commentsCount: comments.length };
			}),
		);

		return {
			error: null,
			res: { posts: newPosts, links },
		};
	} catch (error) {
		return error;
	}
};
