import { styled } from 'styled-components';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { useServerRequest } from '../../../../hooks';
import { editPostAsync } from '../../../../actions';

const PostFormContainer = ({ className, post }) => {
	const { id, title, imageURL, content, publishedAt } = post;
	const imageRef = useRef(null);
	const titleRef = useRef(null);
	const contentRef = useRef(null);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();

	const onSave = () => {
		const sanitizeContent = (content) =>
			content
				.replaceAll('&nbsp;', ' ')
				.replace(/ +/, ' ')
				.replaceAll('<div><br></div>', '\n')
				.replaceAll('<div>', '\n')
				.replaceAll('</div>', '');
		const newImageURL = imageRef.current.value;
		const newTitle = titleRef.current.value;
		const newContent = sanitizeContent(contentRef.current.innerHTML);
		dispatch(
			editPostAsync(requestServer, {
				imageURL: newImageURL,
				title: newTitle,
				content: newContent,
				postId: id,
			}),
		);
		navigate(`/post/:${id}`);
	};
	return (
		<div className={className}>
			<Input ref={imageRef} defaultValue={imageURL} />
			<Input ref={titleRef} defaultValue={title} />
			<SpecialPanel
				publishedAt={publishedAt}
				postId={id}
				iconName="fa-floppy-o"
				onClick={onSave}
			/>
			<div
				ref={contentRef}
				className="post-text"
				contentEditable={true}
				suppressContentEditableWarning={true}
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .post-text {
		font-size: 18px;
		white-space: pre-line;
	}
`;
