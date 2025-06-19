import { sessions } from '../sessions';
import { ROLE } from '../constants';
import { getPost, getComments, savePost, createPost } from '../api';

export const editPost = async (hash, { imageUrl, title, content, postId }) => {
	const accessRoles = [ROLE.ADMIN];

	try {
		const access = await sessions.access(hash, accessRoles);
		if (!access) {
			return { error: 'Вы не авторизованы!', res: null };
		}

		const editedPost =
			postId === null
				? await createPost({ imageUrl, title, content })
				: await savePost({ imageUrl, title, content, postId });
		// const post = await getPost(editedPost.id);

		const comments = await getComments(editedPost.id);
		return {
			error: null,
			res: { ...editedPost, comments },
		};
	} catch (error) {
		return error;
	}
};
