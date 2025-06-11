export const postTransformer = (post) => {
	return {
		id: post.id,
		title: post.title,
		content: post.content,
		publishedAt: post.published_at,
		imageURL: post.image_url,
		comments: post.comments,
	};
};
