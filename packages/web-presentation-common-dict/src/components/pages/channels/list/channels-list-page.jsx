import React, {Component} from 'react';
import {withPageRouter, compose, withActions} from '@efr/medservice-web-presentation-core';
import {Grid} from '@efr/medservice-web-presentation-ui';
import {ChannelViewPage} from "../view";
import {GetChannelAction, GetChannelsListAction} from "../../../../actions";

const columns = [
    {key: 'shortName', name: 'Сокращенное название'},
    {key: 'fullName', name: 'Полное название'}
];

class ChannelsPage extends Component {

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
                    emptyMessage="Нет доступных справочников"
                    onCellClick={this.handleView}
                    dataId="gridId"
                />
            </div>
        )
    }

    handleView = rowData => {
        this.props.pageRouter.open(ChannelViewPage.key, {id: rowData.id})
    };

    getData = (...params) => {
        return this.props.actions.getChannelsList(...params)
            .then(data => ({
                rows: data.content,
                hasMore: false,
                totalElements: data.length,
                totalPages: data.totalPages,
                last: data.last,
                size: data.size,
                page: data.number,
                sort: data.sort,
                first: data.first,
                numberOfElements: data.length,
            }))
    };
}

export default compose(
    withPageRouter,
    withActions({
        getChannelsList: GetChannelsListAction.name,
        getChannel: GetChannelAction.name
    }),
)(ChannelsPage)
