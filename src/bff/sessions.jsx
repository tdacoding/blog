import { addSession, deleteSession, getSession } from './api';

export const sessions = {
	create(user) {
		const hash = Math.random().toFixed(50);
		addSession(hash, user);
		return hash;
	},
	async remove(hash) {
		const session = await getSession(hash);
		deleteSession(session.id);
	},
	async access(hash, accessRole) {
		const session = await getSession(hash);

		return !!session && accessRole.includes(session.user.roleId);
	},
};
