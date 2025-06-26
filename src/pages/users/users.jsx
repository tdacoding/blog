import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { H2, PrivateContent } from '../../components/';
import { ROLE } from '../../constants';
import { useServerRequest } from '../../hooks';
import { selectUserRole } from '../../selectors';
import { checkAccess } from '../../utils';
import { UserRow, TableRow } from './components';

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
	const requestServer = useServerRequest();
	const userRole = useSelector(selectUserRole);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}
		Promise.all([requestServer('fetchUsers'), requestServer('fetchRoles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}
				setUsers(usersRes.res);
				setRoles(rolesRes.res);
			},
		);
	}, [requestServer, shouldUpdateUserList, userRole]);

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}
		requestServer('removeUser', userId).then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	return (
		<div className={className}>
			<PrivateContent access={[ROLE.ADMIN]} error={errorMessage}>
				<H2>Пользователи</H2>
				<div>
					<TableRow>
						<div className="login-column">Логин</div>
						<div className="reg-column">Дата регистрации</div>
						<div className="role-column">Роль</div>
					</TableRow>

					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow
							id={id}
							login={login}
							registeredAt={registeredAt}
							roleId={roleId}
							key={id}
							onUserRemove={() => onUserRemove(id)}
							roles={roles.filter(({ id }) => id != ROLE.GUEST)}
						></UserRow>
					))}
				</div>
			</PrivateContent>
		</div>
	);
};
export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	width: 570px;
	font-size: 18px;
`;
