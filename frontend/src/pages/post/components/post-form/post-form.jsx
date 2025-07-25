import { styled } from 'styled-components';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { editPostAsync } from '../../../../actions';

const PostFormContainer = ({ className, post }) => {
	const { id, title, imageUrl, content, publishedAt } = post;
	const imageRef = useRef(null);
	const titleRef = useRef(null);
	const contentRef = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSave = () => {
		const sanitizeContent = (content) =>
			content
				.replaceAll('&nbsp;', ' ')
				.replace(/ +/, ' ')
				.replaceAll('<div><br></div>', '\n')
				.replaceAll('<div>', '\n')
				.replaceAll('</div>', '');
		const newImageUrl = imageRef.current.value;
		const newTitle = titleRef.current.value;
		const newContent = sanitizeContent(contentRef.current.innerHTML);
		dispatch(
			editPostAsync(id, {
				imageUrl: newImageUrl,
				title: newTitle,
				content: newContent,
			}),
		).then(({ id }) => {
			navigate(`/post/:${id}`);
		});
	};
	return (
		<div className={className}>
			<Input
				ref={imageRef}
				defaultValue={imageUrl}
				placeholder="Ссылка на изображение"
			/>
			<Input ref={titleRef} defaultValue={title} placeholder="Название статьи" />
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
		min-height: 80px;
		border: 1px solid #000;
	}
`;
