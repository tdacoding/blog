import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { useServerRequest } from '../../../../hooks';
import { selectUserId } from '../../../../selectors';
import { Icon } from '../../../../components';
import { addCommentAsync } from '../../../../actions';
import { Comment } from './components';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	const requestServer = useServerRequest();
	const onNewCommentAdd = (postId, userId, newComment) => {
		setNewComment('');
		dispatch(addCommentAsync(requestServer, postId, userId, newComment));
	};

	return (
		<div className={className}>
			<div className="new-comment">
				<textarea
					name="comment"
					value={newComment}
					placeholder="Комментарий..."
					onChange={({ target }) => setNewComment(target.value)}
				></textarea>
				<Icon
					id="fa-paper-plane-o"
					size="16px"
					margin="0 0 0 10px"
					onClick={() => onNewCommentAdd(postId, userId, newComment)}
				/>
			</div>
			<div className="comments">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 580px;
	margin: 0 auto;
	& .new-comment {
		display: flex;
		width: 100%;
		margin: 20px 0 0;
	}

	& .new-comment textarea {
		width: 100%;
		height: 120px;
		resize: none;
		font-size: 18px;
	}
	& .comments {
		width: 100%;
	}
`;
