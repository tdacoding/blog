import { styled } from 'styled-components';

const Div = styled.div`
	text-align: center;
`;

function App() {
	return (
		<Div>
			<h1>edede</h1>
			<header>Заголовок</header>
			<i className="fa fa-paper-plane" aria-hidden="true">
				ss
			</i>
			<i className="fa fa-paper-plane" aria-hidden="false"></i>
		</Div>
	);
}

export default App;
