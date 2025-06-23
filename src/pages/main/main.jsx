import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useServerRequest } from '../../hooks';
import { PostCard } from './components/post-card/post-card';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const requestServer = useServerRequest();
	useEffect(() => {
		requestServer('fetchPosts').then((postsRes) => {
			if (postsRes.error) {
				return;
			}
			setPosts(postsRes.res);
		});
	}, [requestServer]);
	return (
		<div className={className}>
			<div className="post-list">
				{posts.map(({ id, title, publishedAt, imageUrl, commentsCount }) => (
					<PostCard
						key={id}
						id={id}
						title={title}
						publishedAt={publishedAt}
						imageUrl={imageUrl}
						commentsCount={commentsCount}
					/>
				))}
			</div>
		</div>
	);
};

export const Main = styled(MainContainer)`
	padding: 20px;
	& .post-list {
		display: flex;
		flex-wrap: wrap;
	}
`;
