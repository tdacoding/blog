export const savePost = ({ imageUrl, title, content, postId }) =>
	fetch(`http://localhost:3000/posts/${postId}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			image_url: imageUrl,
			title: title,
			content: content,
		}),
	}).then((data) => data.json());
