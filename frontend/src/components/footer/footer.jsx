import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState();
	const [temperature, setTemperature] = useState();
	const [description, setDescription] = useState();
	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Syktyvkar&units=metric&lang=ru&appid=ba6a1c6f7d72845dfc78f2bf6971519e',
		)
			.then((res) => res.json())
			.then(({ name, main, weather }) => {
				setCity(name);
				setTemperature(Math.round(main.temp));
				setDescription(weather[0].description);
			});
	}, []);
	return (
		<footer className={className}>
			<div>
				<div>Блог веб-разработчика</div>
				<div>web@developer.ru</div>
			</div>

			<div>
				<div>
					{city},{' '}
					{new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })}
				</div>
				<div>
					{temperature} градусов, {description}
				</div>
			</div>
		</footer>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	box-shadow: 0px 2px 17px #000;
	background-color: #fff;
	font-weight: bold;
`;
