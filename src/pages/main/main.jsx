import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useServerRequest } from '../../hooks';
import { PAGINATION_LIMIT } from '../../constants';
import { PostCard } from './components/post-card/post-card';
import { Pagination } from './components/pagination/pagination';
import { Search } from './components/search/search';
import { debounce } from './utils/debounce';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [searchFlag, setSearchFlag] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [lastPage, setLastPage] = useState(1);
	const requestServer = useServerRequest();
	useEffect(() => {
		requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT).then(
			(postsRes) => {
				if (postsRes.error) {
					return;
				}
				setPosts(postsRes.res.posts);
				const last =
					postsRes.res.links &&
					postsRes.res.links.match(
						/^.+_page=(\d{1,4})&_limit=\d{1,3}>; rel="last"$/,
					)[1];

				setLastPage(Number(last));
			},
		);
	}, [requestServer, page, searchFlag]);
	const delayedSetter = useMemo(() => debounce(setSearchFlag, 2000), []);
	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		delayedSetter(!searchFlag);
	};

	return (
		<div className={className}>
			<div className="post-and-search">
				<Search onChange={onSearch} searchPhrase={searchPhrase} />
				{posts.length > 0 ? (
					<div className="post-list">
						{posts.map(
							({ id, title, publishedAt, imageUrl, commentsCount }) => (
								<PostCard
									key={id}
									id={id}
									title={title}
									publishedAt={publishedAt}
									imageUrl={imageUrl}
									commentsCount={commentsCount}
								/>
							),
						)}
					</div>
				) : (
					<div className="no-posts-found">Статьи не найдены</div>
				)}
			</div>
			{lastPage > 1 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px 20px 80px;
	}

	& .post-and-search {
		width: 100%;
	}

	& .no-posts-found {
		text-align: center;
		font-size: 18px;
		margin-top: 20px;
	}
`;
