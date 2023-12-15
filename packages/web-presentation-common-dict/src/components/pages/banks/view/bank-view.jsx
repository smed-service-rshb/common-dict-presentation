import React, {Component} from 'react';
import {
    PropTypes,
    compose,
    withActions,
    withFormData,
    withPageRouter,
    withAuthContext,
    withModals
} from '@efr/medservice-web-presentation-core';
import {Input, Panel, Field, Form, Button} from '@efr/medservice-web-presentation-ui';
import {BanksListPage} from "../list";
import Messages from "../../../messages";
import {GetBankAction} from "../../../../actions";

const NameField = withFormData.createField(
    'name',
    ({value, onChange, errorMessage}) => (
        <Field title={Messages.BanksService.ViewForm.BankName} error={errorMessage} value={value}>
            <Input type='text' value={value} onChange={onChange} disabled={true} dataId="field-name"/>
        </Field>
    ),
    ({validator}) => ([])
);

const BICField = withFormData.createField(
    'bic',
    ({value, onChange, errorMessage}) => (
        <Field title={Messages.BanksService.ViewForm.BankBic} error={errorMessage} value={value}>
            <Input type='text' value={value} onChange={onChange} disabled={true} dataId="field-name"/>
        </Field>
    ),
    ({validator}) => ([])
);

const SWIFTField = withFormData.createField(
    'swift',
    ({value, onChange, errorMessage}) => (
        <Field title={Messages.BanksService.ViewForm.BankSwift} error={errorMessage} value={value}>
            <Input type='text' value={value} onChange={onChange} disabled={true} dataId="field-name"/>
        </Field>
    ),
    ({validator}) => ([])
);

const DescriptionField = withFormData.createField(
    'description',
    ({value, onChange, errorMessage}) => (
        <Field title={Messages.BanksService.ViewForm.BankDescription} error={errorMessage} value={value}>
            <Input type='text' value={value} onChange={onChange} disabled={true} dataId="field-name"/>
        </Field>
    ),
    ({validator}) => ([])
);

const CorrAccountField = withFormData.createField(
    'corrAccount',
    ({value, onChange, errorMessage}) => (
        <Field title={Messages.BanksService.ViewForm.BankCorrAccount} error={errorMessage} value={value}>
            <Input type='text' value={value} onChange={onChange} disabled={true} dataId="field-name"/>
        </Field>
    ),
    ({validator}) => ([])
);

const AddressField = withFormData.createField(
    'address',
    ({value, onChange, errorMessage}) => (
        <Field title={Messages.BanksService.ViewForm.BankAddress} error={errorMessage} value={value}>
            <Input type='text' value={value} onChange={onChange} disabled={true} dataId="field-name"/>
        </Field>
    ),
    ({validator}) => ([])
);


class ViewBank extends Component {

    componentDidMount = () => {
        const {getBank} = this.props.actions;
        getBank(this.props.id)
            .then(bank => {
                this.props.formData.init({
                    [NameField.name]: bank.name,
                    [BICField.name]: bank.bic,
                    [SWIFTField.name]: bank.swift,
                    [DescriptionField.name]: bank.description,
                    [CorrAccountField.name]: bank.corrAccount,
                    [AddressField.name]: bank.address
                })
            })
            .catch(error => {
                this.back();
                this.props.modals.alert({message: Messages.BanksService.ErrorMessages.GettingIsNotSuccess});
            })
    };

    back = () => {
        this.props.pageRouter.open(BanksListPage.key);
    };

    getButtons() {
        const Buttons = [<Button key="back" name={Messages.BanksService.ButtonsName.Back} dataId="button-back"
                                 onClick={this.back}/>];
        return Buttons;
    };

    render = () => {

        const {renderField} = this.props.formData;

        return (
            <div>
                <Panel label={Messages.BanksService.ViewForm.FromName} dataId="viewComponent">
                    <Form dataId="bank-view-form" buttons={this.getButtons()}>
                        {renderField(NameField)}
                        {renderField(BICField)}
                        {renderField(SWIFTField)}
                        {renderField(DescriptionField)}
                        {renderField(CorrAccountField)}
                        {renderField(AddressField)}
                    </Form>
                </Panel>
            </div>
        )
    };

    static propTypes = {
        id: PropTypes.number.isRequired,
    };
}

export default compose(
    withPageRouter,
    withActions({
        getBank: GetBankAction.name
    }),
    withFormData,
    withAuthContext,
    withModals({})
)(ViewBank)
