import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { Icon, Button } from '../../../../components';
import { ROLE } from '../../../../constants';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectUserRole,
	selectUserLogin,
	selectUserSession,
} from '../../../../selectors';

import { logout } from '../../../../actions';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;
const UserName = styled.div`
	font-size: 18px;
	font-weight: bold;
	margin: 0 10px 0 0;
	height: 32px;
	align-content: center;
`;

const StyledIcon = styled.div`
	&:hover {
		cursor: pointer;
	}
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const session = useSelector(selectUserSession);

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Войти</Link>
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<StyledIcon>
							<Icon
								id="fa-sign-out"
								size="24px"
								margin="0 0 0 0"
								onClick={() => {
									dispatch(logout(session));
									navigate('/login');
								}}
							/>
						</StyledIcon>
					</>
				)}
			</RightAligned>

			<RightAligned>
				<StyledIcon onClick={() => navigate(-1)}>
					<Icon id="fa-backward" size="24px" margin="10px 0 0 0" />
				</StyledIcon>

				<Link to="/post">
					<Icon id="fa-file-text-o" size="24px" margin="10px 0 0 16px" />
				</Link>
				<Link to="/users">
					<Icon id="fa-users" size="24px" margin="10px 0 0 16px" />
				</Link>
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
