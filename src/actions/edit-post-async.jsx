import { setPostData } from './set-post-data';

export const editPostAsync =
	(requestServer, { imageURL, title, content, postId }) =>
	(dispatch) => {
		requestServer('editPost', { imageURL, title, content, postId }).then(
			(postData) => {
				dispatch(setPostData(postData.res));
			},
		);
	};
