import { sessions } from '../sessions';
import { ROLE } from '../constants';
import { getRoles } from '../api';

export const fetchRoles = async (hash) => {
	const accessRoles = [ROLE.ADMIN];
	try {
		const access = await sessions.access(hash, accessRoles);
		if (!access) {
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
