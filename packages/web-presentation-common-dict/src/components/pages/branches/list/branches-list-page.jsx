import React, {Component} from 'react';
import {compose, withActions, withPageRouter} from '@efr/medservice-web-presentation-core';
import {Grid} from '@efr/medservice-web-presentation-ui';
import {BranchViewPage} from '../view'
import {GetBranchAction, GetBranchesListAction} from "../../../../actions";

const columns = [
    {key: 'id', name: 'Номер'},
    {key: 'simpleName', name: 'Сокращенное название'},
    {key: 'officialName', name: 'Полное название'}
];

class BranchesPage extends Component {

    constructor(props) {
        super(props);
        this.dataSource = Grid.createDataSource(this.getData);
    };

    render () {
        return (
            <div>
                <Grid
                    columns = {columns}
                    dataSource = {this.dataSource}
                    emptyMessage = "Нет доступных справочников"
                    onCellClick = {this.handleView}
                    dataId="gridId"
                >
                </Grid>
            </div>
        )
    }

    handleView = rowData => {
        this.props.pageRouter.open(BranchViewPage.key, {id:rowData.id})
    };

    getData = (...params) => {
        return this.props.actions.getBranchesList(...params)
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
        getBranchesList: GetBranchesListAction.name,
        getBranch: GetBranchAction.name,
    }),
)(BranchesPage)
