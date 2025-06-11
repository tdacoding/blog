import { generateDate } from '../utils';

export const createComment = (postId, userId, content) =>
	fetch('http://localhost:3000/comments', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			author_id: userId,
			post_id: postId,
			content,
			published_at: generateDate(),
		}),
	});
