import { styled } from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useMatch } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { loadPostAsync } from '../../actions';
import { selectPost } from '../../selectors';
import { PostContent, Comments, PostForm } from './components';

const PostContainer = ({ className }) => {
	const post = useSelector(selectPost);
	const dispatch = useDispatch();
	const params = useParams();
	const isEditing = useMatch('/post/:id/edit');

	const requestServer = useServerRequest();
	const id = params.id[0] === ':' ? params.id.slice(1) : params.id;
	useEffect(() => {
		dispatch(loadPostAsync(requestServer, id));
	}, [requestServer, dispatch, id]);
	return (
		<div className={className}>
			{!isEditing ? <PostContent post={post} /> : <PostForm post={post} />}
			{!isEditing ? <Comments comments={post.comments} postId={post.id} /> : ''}
		</div>
	);
};

export const Post = styled(PostContainer)`
	padding: 0px 80px;
	margin: 40px 0;
`;
