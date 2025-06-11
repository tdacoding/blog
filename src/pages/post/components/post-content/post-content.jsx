import { styled } from 'styled-components';
import { H2 } from '../../../../components';
import { Icon } from '../../../../components';

const PostContentContainer = ({ className, post }) => {
	const { id, title, imageURL, content, publishedAt } = post;
	return (
		<div className={className}>
			<img src={imageURL} alt="Название статьи" />
			<H2>{title}</H2>
			<div className="special-panel">
				<div className="published-at">
					<Icon id="fa-calendar-o" size="18px" margin="0 8px 0 0" />
					{publishedAt}
				</div>
				<div className="buttons">
					<Icon id="fa-pencil-square-o" size="21px" margin="1px 10px 0 0" />
					<Icon id="fa-trash-o" size="21px" margin="0 0 0 0" />
				</div>
			</div>
			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}
	& .special-panel {
		margin: -20px 0 20px;
		font-size: 18px;
		display: flex;
		justify-content: space-between;
	}

	& .published-at {
		display: flex;
	}
	& .buttons {
		display: flex;
	}
	& .post-text {
		font-size: 18px;
	}
`;
