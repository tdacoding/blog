import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../../components';
import { openModal, CLOSE_MODAL, removePostAsync } from '../../../../actions';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constants';
import { selectUserRole } from '../../../../selectors';

const SpecialPanelContainer = ({ className, publishedAt, iconName, onClick, postId }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);
	const isAdmin = checkAccess([ROLE.ADMIN], roleId);
	const onPostRemove = (postId) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync(postId)).then(() => navigate('/'));
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
				{publishedAt && (
					<Icon id="fa-calendar-o" size="18px" margin="0 8px 0 0" />
				)}
				{publishedAt}
			</div>
			{isAdmin && (
				<div className="buttons">
					<Icon
						id={iconName}
						size="21px"
						margin="1px 10px 0 0"
						onClick={onClick}
					/>
					{publishedAt && (
						<Icon
							id="fa-trash-o"
							size="21px"
							margin="0 0 0 0"
							onClick={() => onPostRemove(postId)}
						/>
					)}
				</div>
			)}
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
