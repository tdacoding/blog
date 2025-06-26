import { useSelector } from 'react-redux';
import { Error } from '../error/error';
import { selectUserRole } from '../../selectors';
import { checkAccess } from '../../utils';

export const PrivateContent = ({ children, access, error: serverError = null }) => {
	const userRole = useSelector(selectUserRole);
	const accessRole = checkAccess(access, userRole) ? null : 'Доступ запрещен!';
	const error = serverError || accessRole;

	return error ? <Error error={error} /> : children;
};
