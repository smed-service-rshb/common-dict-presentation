import React from 'react';
import {compose, PropTypes, withActions, withPageRouter} from '@efr/medservice-web-presentation-core';
import {Panel, Form, Field, Button} from '@efr/medservice-web-presentation-ui'
import {OfficesListPage} from "../list";

import {GetOfficeInfoAction} from "../../../../actions";

const OfficeOfficialNameField = value => {
	return (
		<Field title='Название офиса' required={false}>
			<div>{value}</div>
		</Field>
	)
};

const OfficeAddressField = value => {
	return (
		<Field title='Адресс' required={false}>
			<div>{value}</div>
		</Field>
	)
};

const OfficePhoneNameField = value => {
	return (
		<Field title='Телефон' required={false}>
			<div>{value}</div>
		</Field>
	)
};

const OfficeStartTimeField = value => {
	return (
		<Field title='Время начала работы' required={false}>
			<div>{value}</div>
		</Field>
	)
};

const OfficeEndTimeNameField = value => {
	return (
		<Field title='Время концы работы' required={false}>
			<div>{value}</div>
		</Field>
	)
};

class OfficeInfoComponent extends React.Component {
	state = {
		office: {}
	};
	componentDidMount = () => {
		const {getOfficeInfo} = this.props.actions;
		const id = this.props.id;
		if(id) {
			getOfficeInfo(id)
				.then(result => {
					this.setState({office: result});
				})
				.catch(error => {
					console.log(error);
				})
		}
	};

	cancel = () => {
		this.props.pageRouter.open(OfficesListPage.key);
	};

	render() {
		const Buttons = [
			<Button key="cancel"
			        name="Назад"
			        dataId="button-cancel"
			        onClick={this.cancel}
			        type={Button.buttonTypes.secondary}
			/>
		];

		return (
			<div>
				<Panel label="Информация об офисе" dataId="infoComponent">
					<Form dataId="infoForm" buttons={Buttons}>
						{OfficeOfficialNameField(this.state.office.officialName)}
						{OfficeAddressField(this.state.office.postAddress)}
						{OfficePhoneNameField(this.state.office.phone)}
						{OfficeStartTimeField(this.state.office.startTime)}
						{OfficeEndTimeNameField(this.state.office.endTime)}
					</Form>
				</Panel>
			</div>
		)
	}

	static propTypes = {
		id: PropTypes.number.isRequired,
	};
}

export default compose(
	withPageRouter,
	withActions({
		getOfficeInfo: GetOfficeInfoAction.name
	})
)(OfficeInfoComponent);