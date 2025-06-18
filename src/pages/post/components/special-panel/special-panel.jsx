import styled from 'styled-components';
import { Icon } from '../../../../components';

const SpecialPanelContainer = ({ className, publishedAt, iconName, onClick }) => {
	return (
		<div className={className}>
			<div className="published-at">
				<Icon id="fa-calendar-o" size="18px" margin="0 8px 0 0" />
				{publishedAt}
			</div>
			<div className="buttons">
				<Icon id={iconName} size="21px" margin="1px 10px 0 0" onClick={onClick} />
				<Icon id="fa-trash-o" size="21px" margin="0 0 0 0" />
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
