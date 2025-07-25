import { ACTION_TYPE } from './action-type';

export const addComment = (content) => {
	return {
		type: ACTION_TYPE.ADD_COMMENT,
		payload: content,
	};
};
