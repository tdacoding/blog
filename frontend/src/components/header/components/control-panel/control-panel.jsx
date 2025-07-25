import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Button } from '../../../../components';
import { ROLE } from '../../../../constants';
import { selectUserRole, selectUserLogin } from '../../../../selectors';

import { logout, RESET_POST_DATA } from '../../../../actions';
import { checkAccess } from '../../../../utils';

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

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
		navigate('/login');
	};

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

						<Icon
							id="fa-sign-out"
							size="24px"
							margin="0 0 0 0"
							onClick={onLogout}
						/>
					</>
				)}
			</RightAligned>

			<RightAligned>
				<Icon
					id="fa-backward"
					size="24px"
					margin="10px 0 0 0"
					onClick={() => navigate(-1)}
				/>

				{isAdmin ? (
					<>
						<Icon
							id="fa-file-text-o"
							size="24px"
							margin="10px 0 0 16px"
							onClick={() => {
								dispatch(RESET_POST_DATA);
								navigate('/post');
							}}
						/>

						<Icon
							id="fa-users"
							size="24px"
							margin="10px 0 0 16px"
							onClick={() => navigate('/users')}
						/>
					</>
				) : (
					''
				)}
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
