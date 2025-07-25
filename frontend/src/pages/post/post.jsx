import { styled } from 'styled-components';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useMatch } from 'react-router-dom';
import { loadPostAsync, RESET_POST_DATA } from '../../actions';
import { selectPost } from '../../selectors';
import { Error, PrivateContent } from '../../components';
import { ROLE } from '../../constants';
import { PostContent, Comments, PostForm } from './components';

const PostContainer = ({ className }) => {
	const post = useSelector(selectPost);
	const dispatch = useDispatch();
	const params = useParams();
	const isEditing = !!useMatch('/post/:id/edit');
	const isCreating = !!useMatch('/post');
	const [error, setError] = useState(true);

	const id = !isCreating && params.id[0] === ':' ? params.id.slice(1) : params.id;

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch]);

	useEffect(() => {
		if (isCreating) {
			setError(null);
			return;
		}

		dispatch(loadPostAsync(id)).then((postData) => {
			if (postData.error) {
				setError(postData.error);
			} else setError(null);
		});
	}, [dispatch, id, isCreating]);
	return error ? (
		<Error error={error.message} />
	) : (
		<div className={className}>
			{!(isEditing || isCreating) ? (
				<>
					<PostContent post={post} />
					<Comments comments={post.comments} postId={post.id} />
				</>
			) : (
				<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
					<PostForm post={post} />
				</PrivateContent>
			)}
		</div>
	);
};

export const Post = styled(PostContainer)`
	padding: 0px 80px;
	margin: 40px 0;
`;
