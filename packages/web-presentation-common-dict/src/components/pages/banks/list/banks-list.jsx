import React, {Component} from 'react';
import {withPageRouter, compose, withActions, withModals} from '@efr/medservice-web-presentation-core';
import {Grid} from '@efr/medservice-web-presentation-ui';
import {BankViewPage} from "../view";
import {GetBanksAction} from "../../../../actions";
import Messages from "../../../messages";

const columns = [
    {key: 'name', name: Messages.BanksService.ListForm.BankName},
    {key: 'bic', name: Messages.BanksService.ListForm.BankBic},
    {key: 'swift', name: Messages.BanksService.ListForm.BankSwift},
    {key: 'description', name: Messages.BanksService.ListForm.BankDescription},
    {key: 'corrAccount', name: Messages.BanksService.ListForm.BankCorrAccount},
    {key: 'address', name: Messages.BanksService.ListForm.BankAddress},
    {key: 'resident', name: Messages.BanksService.ListForm.BankIsResident}
];


class Banks extends Component {
    constructor(props) {
        super(props);
        this.dataSource = Grid.createDataSource(this.getData);
    };

    render() {
        return (
            <div>
                <Grid
                    columns={columns}
                    dataSource={this.dataSource}
                    emptyMessage={Messages.BanksService.ErrorMessages.NotAvailableDictionaries}
                    onCellClick={this.handleView}
                    dataId="gridId"
                />
            </div>
        )
    }

    handleView = rowData => {
        this.props.pageRouter.open(BankViewPage.key, {id: rowData.id});
    };


    getData = (...params) => {
        return this.props.actions.getBanksListList(...params)
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
        getBanksListList: GetBanksAction.name,
    }),
    withModals({})
)(Banks)
