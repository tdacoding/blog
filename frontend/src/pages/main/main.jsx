import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { PAGINATION_LIMIT } from '../../constants';
import { request } from '../../utils/request';
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
	useEffect(() => {
		request(
			`/api/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
			'GET',
		).then(({ data: { posts, lastPage } }) => {
			setPosts(posts);
			setLastPage(Number(lastPage));
		});
	}, [page, searchFlag]);
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
						{posts.map(({ id, title, publishedAt, imageUrl, comments }) => (
							<PostCard
								key={id}
								id={id}
								title={title}
								publishedAt={publishedAt}
								imageUrl={imageUrl}
								commentsCount={comments.length}
							/>
						))}
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
