import { styled } from 'styled-components';
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useMatch } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { loadPostAsync, RESET_POST_DATA } from '../../actions';
import { selectPost } from '../../selectors';
import { PostContent, Comments, PostForm } from './components';

const PostContainer = ({ className }) => {
	const post = useSelector(selectPost);
	const dispatch = useDispatch();
	const params = useParams();
	const isEditing = useMatch('/post/:id/edit');
	const isCreating = useMatch('/post');

	const requestServer = useServerRequest();
	const id = !isCreating && params.id[0] === ':' ? params.id.slice(1) : params.id;

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch]);

	useEffect(() => {
		if (isCreating) {
			return;
		}
		dispatch(loadPostAsync(requestServer, id));
	}, [requestServer, dispatch, id, isCreating]);
	return (
		<div className={className}>
			{!(isEditing || isCreating) ? (
				<PostContent post={post} />
			) : (
				<PostForm post={post} />
			)}
			{!(isEditing || isCreating) ? (
				<Comments comments={post.comments} postId={post.id} />
			) : (
				''
			)}
		</div>
	);
};

export const Post = styled(PostContainer)`
	padding: 0px 80px;
	margin: 40px 0;
`;
