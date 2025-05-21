import { getUser } from './get-user';
import { createUser } from './create-user';
import { createSession } from './create-session';

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
				res: createSession(user.role_id),
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
				res: createSession(user.role_id),
			};
		} catch (error) {
			return error;
		}
	},
};
