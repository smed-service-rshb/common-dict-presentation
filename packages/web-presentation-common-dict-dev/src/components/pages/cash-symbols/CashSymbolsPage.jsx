import React, {Component} from 'react';
import {compose, withActions} from "@efr/medservice-web-presentation-core";
import {Button, Form, Panel, Field, Input, Fieldset} from '@efr/medservice-web-presentation-ui';

class CashSymbolsPage extends Component {
    state = {
        id: "1",
        code: "11"
    };

    getCashSymbolsList = () => {
        this.props.actions.getCashSymbolsList()
            .then(res => {
                console.log(res)
            })
    };

    getCashSymbol = () => {
        this.props.actions.getCashSymbol(this.state.id)
            .then(res => {
                console.log(res)
            })
    };

    getCashSymbolByCode = () => {
        this.props.actions.getCashSymbolByCode(this.state.code)
            .then(res => {
                console.log(res)
            })
    };

    render() {
        return (
            <Panel dataId="cardClientPanel" label="Тесты процессов">

                <Form dataId="cardClient">
                    <Fieldset>
                        <Button key="getCashSymbolsList"
                                dataId="button-getCashSymbolsList"
                                name="Получить список кассовых символов"
                                onClick={this.getCashSymbolsList}
                        />
                        <Button key="getCashSymbol"
                                dataId="button-getCashSymbol"
                                name="Получить кассовый символ по id"
                                onClick={this.getCashSymbol}
                        />
                        <Button key="getCashSymbolByCode"
                                dataId="button-getCashSymbolByCode"
                                name="Получить кассовый символ по code"
                                onClick={this.getCashSymbolByCode}
                        />
                    </Fieldset>
                    <Fieldset>
                        <Field title="Идентификатор">
                            <Input value={this.state.id}
                                   onChange={e => {
                                       this.setState({id: e})
                                   }}
                                   dataId='cash-symbol-id'
                                   width="250px"
                            />

                        </Field>
                        <Field title="Идентификатор">
                            <Input value={this.state.code}
                                   onChange={e => {
                                       this.setState({code: e})
                                   }}
                                   dataId='cash-symbol-code'
                                   width="250px"
                            />
                        </Field>
                    </Fieldset>
                </Form>
            </Panel>
        )
    }
}

export default compose(
    withActions({
        getCashSymbolsList: "dict.cash-symbols.getList",
        getCashSymbol: "dict.cash-symbols.get",
        getCashSymbolByCode: "dict.cash-symbols.get.by.code",
    })
)(CashSymbolsPage)