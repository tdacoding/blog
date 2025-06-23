import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useServerRequest } from '../../hooks';
import { PAGINATION_LIMIT } from '../../constants';
import { PostCard } from './components/post-card/post-card';
import { Pagination } from './components/pagination/pagination';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const requestServer = useServerRequest();
	useEffect(() => {
		requestServer('fetchPosts', page, PAGINATION_LIMIT).then((postsRes) => {
			if (postsRes.error) {
				return;
			}
			setPosts(postsRes.res.posts);
			const last = postsRes.res.links.match(
				/^.+_page=(\d{1,4})&_limit=\d{1,3}>; rel="last"$/,
			)[1];

			setLastPage(Number(last));
		});
	}, [requestServer, page]);
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
			{lastPage > 1 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
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
