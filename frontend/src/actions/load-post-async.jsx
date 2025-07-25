import { request } from '../utils/request';
import { setPostData } from './set-post-data';

export const loadPostAsync = (postId) => (dispatch) => {
	return request(`/api/posts/${postId}`, 'GET').then((postData) => {
		if (postData.data) {
			dispatch(setPostData(postData.data));
		}
		return postData;
	});
};
