import { sessions } from '../sessions';
import { ROLE } from '../constants';
import { deleteComment, deletePost, getComments } from '../api';

export const removePost = async (hash, postId) => {
	const accessRoles = [ROLE.ADMIN];

	try {
		const access = await sessions.access(hash, accessRoles);
		if (!access) {
			return { error: 'Вы не имеете прав!', res: null };
		}
		await deletePost(postId);

		const comments = await getComments(postId);
		await Promise.all(
			comments.map(({ id }) => {
				deleteComment(id);
			}),
		);

		return {
			error: null,
			res: true,
		};
	} catch (error) {
		return error;
	}
};
