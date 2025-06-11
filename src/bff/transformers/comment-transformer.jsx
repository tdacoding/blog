export const commentTransformer = (comment) => {
	return {
		id: comment.id,
		author: comment.author,
		content: comment.content,
		publishedAt: comment.published_at,
		postId: comment.post_id,
	};
};
