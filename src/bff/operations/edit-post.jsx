import { sessions } from '../sessions';
import { ROLE } from '../constants';
import { getPost, getComments, savePost } from '../api';

export const editPost = async (hash, { imageURL, title, content, postId }) => {
	const accessRoles = [ROLE.ADMIN];

	try {
		const access = await sessions.access(hash, accessRoles);
		if (!access) {
			return { error: 'Вы не авторизованы!', res: null };
		}
		await savePost({ imageURL, title, content, postId });
		const post = await getPost(postId);
		const comments = await getComments(postId);
		return {
			error: null,
			res: { ...post, comments },
		};
	} catch (error) {
		return error;
	}
};
