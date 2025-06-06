import { deleteUser } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const removeUser = async (userSession, userId) => {
	const accessRoles = [ROLE.ADMIN];
	try {
		if (!sessions.access(userSession, accessRoles)) {
			return { error: 'Доступ запрещен!', res: null };
		}

		deleteUser(userId);

		return {
			error: null,
			res: true,
		};
	} catch (error) {
		return error;
	}
};
