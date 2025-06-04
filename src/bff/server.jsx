import { getUser } from './get-user';
import { createUser } from './create-user';
import { sessions } from './sessions';
import { logout } from '../actions';

export const server = {
	async authorize(authLogin, authPassword) {
		try {
			const user = await getUser(authLogin);
			if (!user) {
				return { error: 'Пользователь не найден', res: null };
			}
			if (user.password !== authPassword) {
				return { error: 'Неверный пароль', res: null };
			}

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
	},
	register: async (regLogin, regPassword) => {
		try {
			const user = await getUser(regLogin);
			if (user) {
				return { error: 'Данное Имя пользователя уже используется', res: null };
			}

			await createUser(regLogin, regPassword);

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
	},
	async logout(session) {
		sessions.remove(session);
	},
};
