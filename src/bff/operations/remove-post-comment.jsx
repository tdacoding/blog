import { sessions } from '../sessions';
import { ROLE } from '../constants';
import { deleteComment, getPost, getComments } from '../api';

export const removePostComment = async (hash, commentId, postId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

	try {
		const access = await sessions.access(hash, accessRoles);
		if (!access) {
			return { error: 'Вы не имеете прав!', res: null };
		}
		await deleteComment(commentId);
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
