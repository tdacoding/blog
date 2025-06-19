import { postTransformer } from '../transformers';
import { generateDate } from '../utils';

export const createPost = ({ imageUrl, title, content }) =>
	fetch('http://localhost:3000/posts', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			image_url: imageUrl,
			title: title,
			content: content,
			published_at: generateDate(),
		}),
	})
		.then((data) => data.json())
		.then((post) => post && postTransformer(post));
