export const getSession = async (hash) => {
	const res = await fetch(`http://localhost:3000/sessions/?hash=${hash}`);
	const [session] = await res.json();
	return session;
};
