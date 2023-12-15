import React, {Component} from 'react';
import {compose, withActions, withPageRouter} from '@efr/medservice-web-presentation-core';
import {Grid, Button} from '@efr/medservice-web-presentation-ui';
import {GetDivisionCodeAction, GetDivisionCodesListAction} from "../../../../actions";
import {DivisionCodeViewPage} from "../view";
import {DivisionCodeCreatePage} from "../create";

const columns = [
    {key: 'id', name: 'Номер'},
    {key: 'code', name: 'Код'},
    {key: 'description', name: 'Описание'}
];

class DivisionCodesPage extends Component {

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
                <Button key="create" name='Создать' dataId="button-create" onClick={this.create}/>
            </div>
        )
    }

    handleView = rowData => {
        this.props.pageRouter.open(DivisionCodeViewPage.key, {id:rowData.id})
    };

    create = () => {
        this.props.pageRouter.open(DivisionCodeCreatePage.key, {id:1});
    };

    getData = (...params) => {
        return this.props.actions.getDivisionCodesList(...params)
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
        getDivisionCodesList: GetDivisionCodesListAction.name,
        getDivisionCode: GetDivisionCodeAction.name,
    }),
)(DivisionCodesPage)
