import { sessions } from '../sessions';
import { ROLE } from '../constants';
import { getRoles } from '../api';

export const fetchRoles = async (userSession) => {
	const accessRoles = [ROLE.ADMIN];
	try {
		if (!sessions.access(userSession, accessRoles)) {
			return { error: 'Доступ запрещен!', res: null };
		}

		const roles = await getRoles();
		return {
			error: null,
			res: roles,
		};
	} catch (error) {
		return error;
	}
};
