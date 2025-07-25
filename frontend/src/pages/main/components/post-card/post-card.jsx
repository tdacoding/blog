import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from '../../../../components';

const PostCardContainer = ({
	className,
	id,
	title,
	publishedAt,
	imageUrl,
	commentsCount,
}) => {
	return (
		<div className={className}>
			<Link to={`/post/:${id}`}>
				<img src={imageUrl} alt={title} />
				<div className="post-card-footer">
					<h4>{title}</h4>
					<div className="post-card-info">
						<div className="published-at">
							<Icon id="fa-calendar-o" size="18px" margin="0 7px 0 0" />
							{publishedAt}
						</div>
						<div className="comments-count">
							<Icon id="fa-comment-o" size="18px" margin="0 7px 0 0" />
							{commentsCount}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	display: flex;
	flex-direction: column;
	width: 280px;
	margin: 20px;
	border: 1px solid #000;

	& img {
		display: block;
		width: 100%;
	}

	& .post-card-info {
		display: flex;
		justify-content: space-between;
		margin: 0;
		padding: 5px;
	}

	& .post-card-footer h4 {
		margin: 0;
		padding: 5px 5px 0 5px;
		border-top: 1px solid #000;
	}
	& .published-at {
		display: flex;
	}
	& .comments-count {
		display: flex;
	}
`;
