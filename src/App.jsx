import { styled } from 'styled-components';
import { server } from './bff';
import { useEffect } from 'react';

const Div = styled.div`
	text-align: center;
`;

function App() {
	useEffect(() => {
		const resp = server.authorize('user6', '1234');
		console.log(resp);
	}, []);
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
