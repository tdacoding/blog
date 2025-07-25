import styled from 'styled-components';

const TableRowContainer = ({ className, children }) => {
	return <div className={className}>{children}</div>;
};

export const TableRow = styled(TableRowContainer)`
	display: flex;
	align-items: center;
	border: ${({ border }) => (border ? '1px solid #000' : null)};
	& > div {
		display: flex;
		padding: 0 10px;
	}
	& .login-column {
		width: 172px;
	}
	& .reg-column {
		width: 213px;
	}
	& .role-column {
		width: auto;
	}
`;
