export const sessionTransformer = (session) => {
	return {
		id: session.id,
		hash: session.hash,
		userId: session.user_id,
	};
};
