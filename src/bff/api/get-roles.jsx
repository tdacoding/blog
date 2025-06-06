export const getRoles = async () => {
	const res = await fetch('http://localhost:3000/roles');
	return await res.json();
};
