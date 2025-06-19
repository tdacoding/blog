import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../../components';
import { useServerRequest } from '../../../../hooks';
import { openModal, CLOSE_MODAL, removePostAsync } from '../../../../actions';

const SpecialPanelContainer = ({ className, publishedAt, iconName, onClick, postId }) => {
	const requestServer = useServerRequest();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onPostRemove = (postId) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, postId)).then(() =>
						navigate('/'),
					);
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => {
					dispatch(CLOSE_MODAL);
				},
			}),
		);
	};
	return (
		<div className={className}>
			<div className="published-at">
				<Icon id="fa-calendar-o" size="18px" margin="0 8px 0 0" />
				{publishedAt}
			</div>
			<div className="buttons">
				<Icon id={iconName} size="21px" margin="1px 10px 0 0" onClick={onClick} />
				<Icon
					id="fa-trash-o"
					size="21px"
					margin="0 0 0 0"
					onClick={() => onPostRemove(postId)}
				/>
			</div>
		</div>
	);
};
export const SpecialPanel = styled(SpecialPanelContainer)`
	margin: 20px 0;
	font-size: 18px;
	display: flex;
	justify-content: space-between;

	& .published-at {
		display: flex;
	}
	& .buttons {
		display: flex;
	}
`;
