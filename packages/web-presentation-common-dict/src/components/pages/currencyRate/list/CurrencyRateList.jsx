import React, {Component} from 'react';
import {withPageRouter, compose, withActions,withAuthContext, withModals} from '@efr/medservice-web-presentation-core';
import {Button, Panel} from '@efr/medservice-web-presentation-ui';
import Grid from '@efr/medservice-web-presentation-authentication/src/components/grid'
import {CurrencyRatePage} from "../panel";
import {GetCurrencyRatesAction} from "../../../../actions";
import Messages from "../../../messages";
import {Rights} from '@efr/medservice-web-presentation-authentication'
import './styles.css'

const columns = [
    {key: 'currencyIso', name: Messages.CurrencyRate.currencyId, data: (data)=> <div className={'center'}>{data}</div> },
    {key: 'rate', name: Messages.CurrencyRate.rate, data: (data)=> <div className={'center'}>{data}</div> },
    {key: 'innerRate', name: Messages.CurrencyRate.innerRate, data: (data)=> <div className={'center'}>{data}</div> },
    {key: 'startDate', name: Messages.CurrencyRate.startDate, data: (data)=> <div className={'center'}>{data}</div> },
    {key: 'endDate', name: Messages.CurrencyRate.endDate, data: (data)=> <div className={'center'}>{data}</div> }
];


class Banks extends Component {
    constructor(props) {
        super(props);
        this.dataSource = Grid.createDataSource({
            getData: this.getData,
            gridName: 'CURRENCY_RATE'
        });
    };

    getButtons = () => {
        return <div className="float-right grid-buttons">
            {this.props.authContext.checkPermission(Rights.EDIT_BUSINESS_DICTIONARIES) &&
            <div>
                <Button key="create" type="specialOrange"
                        name={'Создать'} dataId="button-create"
                        onClick={this.create}/>
            </div>}
        </div>
    };

    render() {
        return (
            <Panel labelSecondary={'Справочник курсов валют'} dataId="programListPanel">
                <div>
                    {this.getButtons()}
                    <div className="dict-list">
                <Grid
                    columns={columns}
                    dataSource={this.dataSource}
                    emptyMessage={Messages.CurrencyRate.emptyGridMessage}
                    onCellClick={this.handleView}
                    dataId="gridId"
                />
                    </div>
                </div>
            </Panel>
        )
    }

    create = () => {
        this.props.pageRouter.open(CurrencyRatePage.key);
    };
    handleView = rowData => {
        this.props.pageRouter.open(CurrencyRatePage.key, {id: rowData.id});
    };

    getData = (...params) => {
        return this.props.actions.getCurrencyRates(...params)
            .then(data => ({
                rows: data.content,
                hasMore: !data.last,
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
    withAuthContext,
    withActions({
        getCurrencyRates: GetCurrencyRatesAction.name,
    }),
    withModals({})
)(Banks)
