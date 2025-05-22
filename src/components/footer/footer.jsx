import { styled } from 'styled-components';

const FooterContainer = ({ className }) => {
	return <footer className={className}>Подвал</footer>;
};

export const Footer = styled(FooterContainer)`
	height: 120px;
`;
