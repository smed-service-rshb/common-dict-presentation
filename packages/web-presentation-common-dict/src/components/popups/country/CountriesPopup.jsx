import React from 'react';
import {compose, withAuthContext, withFormData, modal, withActions} from '@efr/medservice-web-presentation-core';
import {Form, Link} from '@efr/medservice-web-presentation-ui';
import {GetCountriesListAction} from '../../../actions/index'
import Messages from "../../messages/";

class CountriesPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            country: '',
            countries: [],
        };
        this.fromButtons = [];
    };

    componentDidMount = () => {
        const {getCountriesListAction} = this.props.actions;
        getCountriesListAction()
            .then(countriesList => {
                let initFields = {
                    "countries": countriesList
                };
                this.props.formData.init(initFields);

            }).catch(error => {
            alert(Messages.Country.error + error);
            throw error
        });
    };

    render = () => {
        const {rawValues} = this.props.formData;
        let countries = rawValues["countries"];
        if (countries === undefined)
            countries = [];
        return (<modal.window title={(Messages.Country.title)}>
            <Form dataId="country-form">
                {countries.map((row, index) =>
                    (<div key={row.code} className="width50 size13 margin-bottom-10">
                        <Link onClick={() => {
                            this._handleOk(row);
                        }} dataId={`field-group-residential-address-change-country-row-${index}`}>{row.name}</Link>
                    </div>))
                }
            </Form>
        </modal.window>)
    };

    _handleOk = (country) => {
        this.props.modal.close('success', {data: country})
    }
}

export default compose(
    withAuthContext,
    withFormData,
    modal(true),
    withActions(
        {
            getCountriesListAction: GetCountriesListAction.name
        }
    )
)(CountriesPopupComponent);