import styled from 'styled-components';
import { Icon } from '../../../../components';
import { useServerRequest } from '../../../../hooks';
import { TableRow } from '../table-row/table-row';
import { useState } from 'react';

const UserRowContainer = ({
	className,
	id,
	login,
	registeredAt,
	onUserRemove,
	roleId: userRoleId,
	roles,
}) => {
	const requestServer = useServerRequest();
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const isSaveButtonDisabled = initialRoleId === selectedRoleId;
	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};
	const onRoleSave = (userId, newUserRoleId) => {
		requestServer('updateUserRole', userId, newUserRoleId).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};
	return (
		<div className={className}>
			<TableRow border={true}>
				<div className="login-column">{login}</div>
				<div className="reg-column">{registeredAt}</div>

				<div className="role-column">
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option value={roleId} key={roleId}>
								{roleName}
							</option>
						))}
					</select>

					<Icon
						id="fa-floppy-o"
						size="24px"
						margin="0 0 0 10px"
						disabled={isSaveButtonDisabled}
						onClick={() => onRoleSave(id, selectedRoleId)}
					/>
				</div>
			</TableRow>
			<Icon
				id="fa-trash-o"
				size="24px"
				margin="0 0 0 10px"
				onClick={onUserRemove}
			/>
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	align-items: center;
	margin-top: 10px;
	& select {
		font-size: 16px;
		padding: 0 5px;
	}
`;
