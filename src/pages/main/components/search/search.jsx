import styled from 'styled-components';
import { Icon, Input } from '../../../../components';

const SearchContainer = ({ className, onChange, searchPhrase }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				placeholder="Поиск по заголовкам"
				onChange={onChange}
			/>
			<Icon id="fa-search" size="18px" margin="0 0 0 -25px" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	align-items: center;
	width: 340px;
	height: 40px;
	margin: 18px auto 15px auto;
	& input {
		margin: 0;
		padding-right: 30px;
	}
`;
