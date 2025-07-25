import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../../../components';
import { removeCommentAsync, openModal, CLOSE_MODAL } from '../../../../../../actions';
import { selectUserRole } from '../../../../../../selectors';
import { ROLE } from '../../../../../../constants';

const CommentContainer = ({ className, id, author, content, publishedAt, postId }) => {
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);
	const mayRemoveComment = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

	const onCommentRemove = (commentId) => {
		if (!mayRemoveComment) {
			return;
		}
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(commentId, postId));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => {
					dispatch(CLOSE_MODAL);
				},
			}),
		);
	};
	return (
		<div className={className}>
			<div className="comment">
				<div className="information-panel">
					<div className="author">
						<Icon id="fa-user-circle-o" size="18px" margin="0 10px 0 0" />
						{author}
					</div>
					<div className="published-at">
						<Icon id="fa-calendar-o" size="18px" margin="0 10px 0 0" />
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			{mayRemoveComment && (
				<Icon
					id="fa-trash-o"
					size="22px"
					margin="0 0 0 10px"
					onClick={() => onCommentRemove(id)}
				/>
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 10px;

	& .information-panel {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
	& .comment-text {
	}
	& .comment {
		padding: 5px 10px;
		border: 1px solid #000;
		width: 100%;
	}

	& .author {
		display: flex;
	}

	& .published-at {
		display: flex;
	}
`;
