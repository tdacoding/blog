import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { H2 } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';

const PostContentContainer = ({ className, post }) => {
	const { id, title, imageUrl, content, publishedAt } = post;
	const navigate = useNavigate();
	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<SpecialPanel
				publishedAt={publishedAt}
				iconName="fa-pencil-square-o"
				postId={id}
				onClick={() => {
					navigate(`/post/:${id}/edit`);
				}}
			/>
			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .post-text {
		font-size: 18px;
		white-space: pre-line;
	}
`;
