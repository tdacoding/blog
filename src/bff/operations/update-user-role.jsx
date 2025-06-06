import { setUserRole } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const updateUserRole = async (userSession, userId, newUserRoleId) => {
	const accessRoles = [ROLE.ADMIN];
	try {
		if (!sessions.access(userSession, accessRoles)) {
			return { error: 'Доступ запрещен!', res: null };
		}

		setUserRole(userId, newUserRoleId);

		return {
			error: null,
			res: true,
		};
	} catch (error) {
		return error;
	}
};
