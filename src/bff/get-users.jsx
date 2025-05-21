export const getUsers = async () => {
	const res = await fetch('http://localhost:3000/users');
	return await res.json();
};
