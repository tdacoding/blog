import { userTransformer } from '../transformers';

export const getUsers = async () => {
	const res = await fetch('http://localhost:3000/users');
	const users = await res.json();
	return users && users.map(userTransformer);
};
