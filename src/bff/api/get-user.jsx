import { userTransformer } from '../transformers';

export const getUser = async (loginToFind) => {
	const res = await fetch(`http://localhost:3000/users/?login=${loginToFind}`);
	const possUser = await res.json();
	const user = possUser[0];
	return user && userTransformer(user);
};
