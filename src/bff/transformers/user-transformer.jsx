export const userTransformer = (user) => {
	return {
		id: user.id,
		login: user.login,
		password: user.password,
		registeredAt: user.registered_at,
		roleId: user.role_id,
	};
};
