import React, {Component} from 'react';
import {compose, withModals} from '@efr/medservice-web-presentation-core';
import {Button} from '@efr/medservice-web-presentation-ui';
import {Popups, Messages} from "@efr/medservice-web-presentation-common-dict"


class PopupTestPage extends Component {
    state = {};

    openBanksPopup = callback => () => {
        this.props.modals.banksModal()
            .on('success', response => {
                callback(response.bank)
            })
    };

    openCountriesPopup = () => {
        this.props.modals.openCountriesModal()
            .on('success', ({data: country}) => (this.setState({country})));
    };

    render() {
        return (
            <div>
                <div>
                    Выбранный банк:
                    {(this.state.selectedBank && JSON.stringify(this.state.selectedBank, null, 2)) || '-'}
                </div>
                <Button name={Messages.BanksService.ListForm.PopupSearchBank}
                        onClick={this.openBanksPopup(bank => (this.setState({selectedBank: bank})))}
                        type={Button.buttonTypes.secondary} dataId="selectedBank"/>
                <div>
                    <div>
                        Выбранная страна:
                        {(this.state.country && JSON.stringify(this.state.country, null, 2)) || '-'}
                    </div>
                    <div>
                        <Button name="Открыть всплывающее окно стран"
                                onClick={this.openCountriesPopup}
                                type={Button.buttonTypes.secondary} dataId="button-selectCountry"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default compose(
    withModals({
        banksModal: Popups.BanksPopup.key,
        openCountriesModal: Popups.CountriesPopup.key,
    })
)(PopupTestPage)
