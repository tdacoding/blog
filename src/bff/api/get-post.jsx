import { postTransformer } from '../transformers';

export const getPost = async (postId) => {
	try {
		const res = await fetch(`http://localhost:3000/posts/${postId}`);
		if (!res.ok) {
			throw new Error(`Пост не найден (${res.status})`); // 404 попадет сюда
		}
		const post = await res.json();
		return post && postTransformer(post);
	} catch (error) {
		console.error('Ошибка запроса:', error.message);
		throw error;
	}
};
