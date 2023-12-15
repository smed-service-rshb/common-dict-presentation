import React from 'react';
import {compose, modal, withActions, withAuthContext, withFormData} from '@efr/medservice-web-presentation-core';
import {Button, Form, Link} from '@efr/medservice-web-presentation-ui';
import {GetBanksAction} from "../../../actions/index";
import Messages from '../../messages/';

class BanksComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            banksArray: undefined
        };
        this.fromButtons = [
            <Button key="cancel"
                    dataId="button-cancel"
                    name={Messages.BanksService.PopupSearch.Buttons.Cancel}
                    onClick={this.cancel}
                    type={Button.buttonTypes.secondary}
            />
        ];
    }

    componentDidMount = () => {
        this.props.actions.getBanksAction()
            .then(
                response => {
                    this.setState({banksArray: response.content})
                }
            )
    };

    render = () => {
        return (
            <modal.window buttons={this.fromButtons}>
                <Form dataId="bank-form">
                    {this.state.banksArray && this.state.banksArray.map(
                        (bank) => {
                            return (
                                <div key={bank.id} className="width50 size13 margin-bottom-10">
                                    <Link onClick={() => {
                                        this.selectBank(bank)
                                    }} dataId={'bank' + bank.id}>{bank.name}</Link>
                                </div>
                            )
                        }
                    )}
                </Form>
            </modal.window>
        )
    };

    cancel = () => {
        this.props.modal.close()
    };

    selectBank = (bank) => {
        this.props.modal.close('success', {bank: bank})
    }
}

export default compose(
    withAuthContext,
    withFormData,
    modal(true),
    withActions({
        getBanksAction: GetBanksAction.name,
    })
)(BanksComponent);
