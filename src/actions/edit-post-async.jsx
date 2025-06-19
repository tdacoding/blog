import { setPostData } from './set-post-data';

export const editPostAsync =
	(requestServer, { imageUrl, title, content, postId }) =>
	async (dispatch) => {
		const postData = await requestServer('editPost', {
			imageUrl,
			title,
			content,
			postId,
		});

		dispatch(setPostData(postData.res));
		return postData.res;
	};
