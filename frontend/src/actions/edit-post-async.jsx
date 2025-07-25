import { request } from '../utils/request';
import { setPostData } from './set-post-data';

export const editPostAsync =
	(id, { imageUrl, title, content }) =>
	async (dispatch) => {
		const postData = id
			? await request(`/api/posts/${id}`, 'PATCH', {
					imageUrl,
					title,
					content,
				})
			: await request('/api/posts', 'POST', {
					imageUrl,
					title,
					content,
				});

		dispatch(setPostData(postData.data));
		return postData.data;
	};
