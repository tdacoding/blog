import { request } from '../utils/request';

export const removePostAsync = (postId) => () => {
	return request(`/api/posts/${postId}`, 'DELETE');
};
