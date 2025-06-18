export const savePost = ({ imageURL, title, content, postId }) =>
	fetch(`http://localhost:3000/posts/${postId}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			image_url: imageURL,
			title: title,
			content: content,
		}),
	});
