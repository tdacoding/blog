import { sessions } from '../sessions';
import { getUser } from '../api';

export const authorize = async (authLogin, authPassword) => {
	try {
		const user = await getUser(authLogin);

		if (!user) {
			return { error: 'Пользователь не найден', res: null };
		}

		const { id, login, password, roleId } = user;

		if (password !== authPassword) {
			return { error: 'Неверный пароль', res: null };
		}

		return {
			error: null,
			res: {
				id,
				login,
				roleId,
				session: sessions.create(user),
			},
		};
	} catch (error) {
		return error;
	}
};
