import { commentTransformer } from '../transformers';

export const getComments = async (postId) => {
	const res = await fetch(`http://localhost:3000/comments/?post_id=${postId}`);

	const comments = await res.json();
	const newComments = await Promise.all(
		comments.map(async (comment) => {
			const resA = await fetch(`http://localhost:3000/users/${comment.author_id}`);
			const author = await resA.json();

			return { ...comment, author: author.login };
		}),
	);
	return newComments && newComments.map(commentTransformer);
};
