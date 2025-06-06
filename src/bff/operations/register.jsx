import { sessions } from '../sessions';
import { getUser, createUser } from '../api';

export const register = async (regLogin, regPassword) => {
	try {
		const existedUser = await getUser(regLogin);
		if (existedUser) {
			return { error: 'Данное Имя пользователя уже используется', res: null };
		}

		const user = await createUser(regLogin, regPassword);

		return {
			error: null,
			res: {
				id: user.id,
				login: user.login,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		};
	} catch (error) {
		return error;
	}
};
