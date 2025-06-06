import { sessions } from '../sessions';
import { ROLE } from '../constants';
import { getUsers } from '../api';

export const fetchUsers = async (userSession) => {
	const accessRoles = [ROLE.ADMIN];
	try {
		if (!sessions.access(userSession, accessRoles)) {
			return { error: 'Доступ запрещен!', res: null };
		}

		const users = await getUsers();

		return {
			error: null,
			res: users,
		};
	} catch (error) {
		return error;
	}
};
