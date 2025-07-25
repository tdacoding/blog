import { request } from '../utils/request';
import { removeComment } from './remove-comment';

export const removeCommentAsync = (commentId, postId) => (dispatch) => {
	request(`/api/posts/${postId}/comments/${commentId}`, 'DELETE').then(() => {
		dispatch(removeComment(commentId));
	});
};
