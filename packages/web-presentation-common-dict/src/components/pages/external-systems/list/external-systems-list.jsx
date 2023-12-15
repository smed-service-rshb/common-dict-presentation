import React, {Component} from 'react';
import {compose, withActions, withPageRouter} from '@efr/medservice-web-presentation-core';
import {Button, Grid, Panel} from '@efr/medservice-web-presentation-ui';
import {ExternalSystemViewPage} from "../view";
import {ExternalSystemCreatePage} from "../create";
import Messages from "../../../messages";
import './styles.css'
import {GetExternalSystemAction, GetExternalSystemsListAction} from "../../../../actions";

const columns = [
    {key: 'systemType', name: Messages.ExternalSystemService.ListForm.ExternalSystemType},
    {key: 'systemId', name: Messages.ExternalSystemService.ListForm.ExternalSystemId},
    {key: 'name', name: Messages.ExternalSystemService.ListForm.ExternalName},
    {key: 'connectTimeout', name: Messages.ExternalSystemService.ListForm.ExternalSystemTimeout, data : data => `${data} мс`},
    {key: 'failurePeriod', name: Messages.ExternalSystemService.ListForm.ExternalSystemFailurePeriod, data : data => `${data} мс`},
    {key: 'failurePeriodCount', name: Messages.ExternalSystemService.ListForm.ExternalSystemFailurePeriodCount}
];


class ExternalSystems extends Component {
    constructor(props) {
        super(props);
        this.dataSource = Grid.createDataSource(this.getData);
    };

    render(){
        return (
			<div className="external-system-list">
                <Panel labelSecondary="Внешние системы" dataId="panel1">
                    <div>
                        <div className="float-right">
                            <Button key="create" type="specialOrange" name={Messages.ExternalSystemService.ButtonsName.Create} dataId="button-create" onClick={this.create}/>
                        </div>
                        <br/>
                        <br/>
                        <Grid
                            columns = {columns}
                            dataSource = {this.dataSource}
                            emptyMessage = {Messages.ExternalSystemService.ErrorMessages.NotAvailableDictionaries}
                            onCellClick = {this.handleView}
                            dataId="gridId"
                        />
                    </div>
                </Panel>
			</div>
        )
    }

    handleView = rowData => {
        this.props.pageRouter.open(ExternalSystemViewPage.key, {id:rowData.id});
    };

    create = () => {
        this.props.pageRouter.open(ExternalSystemCreatePage.key);
    };

    getData = (...params) => {
        return this.props.actions.getExternalSystemsList(...params)
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
}

export default compose(
	withPageRouter,
    withActions({
        getExternalSystemsList: GetExternalSystemsListAction.name,
        getExternalSystem: GetExternalSystemAction.name
    })
)(ExternalSystems)
