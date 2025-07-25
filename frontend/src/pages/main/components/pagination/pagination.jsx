import styled from 'styled-components';
import { Button } from '../../../../components';

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Предыдущая
			</Button>
			<div className="current-page">Страница: {page}</div>
			<Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				Следующая
			</Button>
			<Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	height: 32px;
	display: flex;
	justify-content: center;
	margin: 0 0 20px;
	padding: 0 55px;
	position: absolute;
	width: 100%;
	bottom: 140px;

	& button {
		margin: 0 15px;
	}

	& .current-page {
		width: 100%;
		height: 32px;
		margin: 0 15px;
		text-align: center;
		align-content: center;
		border: 1px solid #000;
		font-size: 18px;
		font-weight: 500;
	}
`;
