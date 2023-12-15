import React from 'react';
import {compose, withActions, withPageRouter} from '@efr/medservice-web-presentation-core';
import {Grid} from '@efr/medservice-web-presentation-ui';
import {GetOfficeListAction} from "../../../../actions";
import {OfficeViewPage} from "../view";

const columnNames = [
	{key: 'rfId', name: 'Номер офиса'},
	{key: 'simpleName', name: 'Название офиса'},
	{key: 'postAddress', name: 'Адресс'},
	{key: 'phone', name: 'Телефон'},
	{key: 'startTime', name: 'Время начала работы'},
	{key: 'endTime', name: 'Время конца работы'}
];

class OfficeDictionaryComponent extends React.Component {
	constructor(props) {
		super(props);
		this.dataSource = Grid.createDataSource(this.getData);
	}

    getData = (...params) => {
        return this.props.actions.getOfficeList(...params)
            .then(data => ({
                rows: data.content,
                hasMore: false,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                last: data.last,
                size: data.size,
                page: data.number,
                sort: data.sort,
                first: data.first,
                numberOfElements: data.numberOfElements,
            }))
    };

	handleOfficeInfo = (rowData ) => {
		this.props.pageRouter.open(OfficeViewPage.key, {id:rowData.id})
	};

	render() {
		return (
			<div>
				<Grid
					columns = {columnNames}
					dataSource = {this.dataSource}
					emptyMessage = "Нет информации по офисам"
					onCellClick = {this.handleOfficeInfo}
					dataId="gridId"
				/>
			</div>
		)
	}
}

export default compose(
	withPageRouter,
	withActions({
		getOfficeList: GetOfficeListAction.name
	})
)(OfficeDictionaryComponent);