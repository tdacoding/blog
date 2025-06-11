import { sessions } from '../sessions';
import { ROLE } from '../constants';
import { createComment, getPost, getComments } from '../api';

export const addPostComment = async (hash, postId, userId, content) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];

	try {
		const access = await sessions.access(hash, accessRoles);
		if (!access) {
			return { error: 'Вы не авторизованы!', res: null };
		}
		await createComment(postId, userId, content);
		const post = getPost(postId);
		const comments = await getComments(postId);
		return {
			error: null,
			res: { ...post, comments },
		};
	} catch (error) {
		return error;
	}
};
