import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import { useEffect, useState } from 'react';
import { Input, Button, H2 } from '../../components/';
import styled from 'styled-components';
import { Link, Navigate } from 'react-router-dom';
import { setUser } from '../../actions';
import { useDispatch, useStore, useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^[a-zA-Z0-9_]+$/, 'Неверный логин!')
		.min(3, 'Минимум 3 символа'),
	password: yup
		.string()
		.required('Требуется указать пароль')
		.matches(
			/^[a-zA-Z0-9#%]+$/,
			'Пароль может содержать лишь буквы, цифры и символы "#", "%"!',
		)
		.min(3, 'Минимальная длина пароля -- 3 символов!'),
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	font-size: 18px;
`;

const ErrorMessage = styled.div`
	background-color: #fcadad;
	font-size: 18px;
	margin: 10px 0 0;
	padding: 10px;
`;

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();
	const store = useStore();
	const roleId = useSelector(selectUserRole);

	useEffect(() => {
		let currentWasLogout = store.getState().app.wasLogout;
		return store.subscribe(() => {
			let previousWasLogout = currentWasLogout;
			currentWasLogout = store.getState().app.wasLogout;
			if (currentWasLogout !== previousWasLogout) {
				reset();
			}
		});
	}, [reset, store]);

	const onSubmit = ({ login, password }) => {
		server.authorize(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}
			dispatch(setUser(res));
		});
	};
	const formError = errors.login?.message || errors.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Авторизация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин"
					{...register('login', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="password"
					placeholder="Пароль"
					{...register('password', { onChange: () => setServerError(null) })}
				/>
				<Button type="submit" disabled={!!formError}>
					Авторизоваться
				</Button>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<StyledLink to="/register">Зарегистрироваться</StyledLink>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
