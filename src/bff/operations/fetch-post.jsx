import { getPost, getComments } from '../api';

export const fetchPost = async (postId) => {
	try {
		const post = await getPost(postId);

		const comments = await getComments(postId);
		return {
			error: null,
			res: { ...post, comments },
		};
	} catch (error) {
		return {
			error,
			res: {},
		};
	}
};
