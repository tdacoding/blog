import { setPostData } from './set-post-data';

export const addCommentAsync =
	(requestServer, postId, userId, newComment) => (dispatch) => {
		requestServer('addPostComment', postId, userId, newComment).then((postData) => {
			dispatch(setPostData(postData.res));
		});
	};
