export const postTransformer = (post) => {
	return {
		id: post.id,
		title: post.title,
		content: post.content,
		publishedAt: post.published_at,
		imageUrl: post.image_url,
	};
};
