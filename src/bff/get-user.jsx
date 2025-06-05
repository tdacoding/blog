import { getUsers } from './get-users';

export const getUser = async (loginToFind) => {
	const res = await fetch(`http://localhost:3000/users/?login=${loginToFind}`);
	const user = await res.json();
	return user[0];
};
