import React, {Component} from 'react';
import {
    compose,
    PropTypes,
    withActions,
    withAuthContext,
    withFormData,
    withModals,
    withPageRouter
} from '@efr/medservice-web-presentation-core';
import {Button, Field, Form, Input, Panel} from '@efr/medservice-web-presentation-ui';
import {ExternalSystemsListPage} from "../list";
import permissions from '../../../../permissions'
import Messages from "../../../messages";
import {EditExternalSystemAction, GetExternalSystemAction, RemoveExternalSystemAction} from "../../../../actions";

const IdField = withFormData.createField(
    'id',
    ({value, onChange, errorMessage}) => (
        <Field title={Messages.ExternalSystemService.EditForm.ExternalSystemId} error={errorMessage}>
            <Input type='text' value={value} disabled={true} error={!!errorMessage} dataId="field-id"/>
        </Field>
    )
);

const NameField = withFormData.createField(
    'name',
    ({value, onChange, errorMessage}) => (
        <Field title={Messages.ExternalSystemService.EditForm.ExternalSystemName} error={errorMessage}>
            <Input type='text' value={value} onChange={onChange} error={!!errorMessage} dataId="field-name"/>
        </Field>
    ),
    ({validator}) => ([
        validator.required(Messages.ExternalSystemService.EditForm.ExternalSystemNameRequired),
    ])
);

const ConnectTimeoutField = withFormData.createField(
    'connectTimeout',
    ({value, onChange, errorMessage}) => (
        <Field title={Messages.ExternalSystemService.EditForm.ExternalSystemTimeout} error={errorMessage}>
            <Input type='text' value={value} onChange={onChange} error={!!errorMessage} dataId="field-connectTimeout"/>
        </Field>
    ),
    ({validator}) => ([
        validator.required(Messages.ExternalSystemService.EditForm.ExternalSystemTimeoutRequired),
        validator.regexp(Messages.ExternalSystemService.EditForm.ExternalSystemTimeoutOnlyDigits, /^\d+$/)
    ])
);

const FailurePeriodField = withFormData.createField(
    'failurePeriod',
    ({value, onChange, errorMessage}) => (
        <Field title={Messages.ExternalSystemService.EditForm.ExternalSystemFailurePeriod} error={errorMessage}>
            <Input type='text' value={value} onChange={onChange} error={!!errorMessage} dataId="field-failurePeriod"/>
        </Field>
    ),
    ({validator}) => ([
        validator.required(Messages.ExternalSystemService.EditForm.ExternalSystemFailurePeriodRequired),
        validator.regexp(Messages.ExternalSystemService.EditForm.ExternalSystemFailurePeriodOnlyDigits, /^\d+$/)
    ])
);

const FailurePeriodCountField = withFormData.createField(
    'failurePeriodCount',
    ({value, onChange, errorMessage}) => (
        <Field title={Messages.ExternalSystemService.EditForm.ExternalSystemFailurePeriodCount} error={errorMessage}>
            <Input type='text' value={value} onChange={onChange} error={!!errorMessage} dataId="field-failurePeriodCount"/>
        </Field>
    ),
    ({validator}) => ([
        validator.required(Messages.ExternalSystemService.EditForm.ExternalSystemFailurePeriodCountRequired),
        validator.regexp(Messages.ExternalSystemService.EditForm.ExternalSystemFailurePeriodCountOnlyDigits, /^\d+$/)
    ])
);

const validationForm = () => {
    const fields = [
        NameField, ConnectTimeoutField, FailurePeriodField, FailurePeriodCountField
    ];

    return withFormData.createValidationForm(fields);
};


class ViewExternalSystem extends Component {

    componentDidMount = () => {
        const {getExternalSystem} = this.props.actions;
        getExternalSystem(this.props.id)
            .then(externalSystem => {
                this.props.formData.init({
                    [IdField.name]: externalSystem.id,
                    [NameField.name]: externalSystem.name,
                    [ConnectTimeoutField.name]: externalSystem.connectTimeout,
                    [FailurePeriodField.name]: externalSystem.failurePeriod,
                    [FailurePeriodCountField.name]: externalSystem.failurePeriodCount
                })
            })
            .catch(error => {
                this.back();
                this.props.modals.alert({message: Messages.ExternalSystemService.ErrorMessages.GettingIsNotSuccess});
                console.log(error);
            })
    };

    back = () => {
        this.props.pageRouter.open(ExternalSystemsListPage.key);
    };

    edit = data => {

        let {rawValues} = this.props.formData;

        data.id = rawValues[IdField.name];

        const {editExternalSystem} = this.props.actions;
        editExternalSystem(data).then(externalSystem => {
            this.props.formData.init({
                [IdField.name]: externalSystem.id,
                [NameField.name]: externalSystem.name,
                [ConnectTimeoutField.name]: externalSystem.connectTimeout,
                [FailurePeriodField.name]: externalSystem.failurePeriod,
                [FailurePeriodCountField.name]: externalSystem.failurePeriodCount
            });
            this.props.modals.alert({message: Messages.ExternalSystemService.Responses.SavingIsSuccess});
        }).catch(error => {
            this.props.modals.alert({message: Messages.ExternalSystemService.ErrorMessages.SavingIsNotSuccess});
            console.log(error);
        })
    };

    remove = () => {
        this.props.modals.confirm({message: Messages.ExternalSystemService.Dialogs.Remove})
            .on('success', this.removeAction);
    };

    removeAction = () => {
        const {removeExternalSystem} = this.props.actions;
        removeExternalSystem(this.props.id).then(result => {
            this.props.modals.alert({message: Messages.ExternalSystemService.Responses.RemovingIsSuccess});
            this.back();
        }).catch(error => {
            this.props.modals.alert({message: Messages.ExternalSystemService.ErrorMessages.RemovingIsNotSuccess});
            console.log(error);
        })
    };

    getButtons() {
        const {validate} = this.props.formData;

        const Buttons = [<Button key="back" name={Messages.ExternalSystemService.ButtonsName.Back} dataId="button-back"
                                 onClick={this.back}/>];

        if (this.props.authContext.checkPermission(permissions.EDIT_EXTERNAL_SYSTEM)) {
            const editButton =
                <Button key="edit" name={Messages.ExternalSystemService.ButtonsName.Edit} dataId="button-edit"
                        onClick={validate(validationForm(), this.edit, data => {
                        })}/>;
            Buttons.push(editButton);
        }

        if (this.props.authContext.checkPermission(permissions.DELETE_EXTERNAL_SYSTEM)) {
            const removeButton =
                <Button key="remove" name={Messages.ExternalSystemService.ButtonsName.Remove} dataId="button-remove"
                        onClick={this.remove}/>;
            Buttons.push(removeButton);
        }

        return Buttons;
    };

    render = () => {

        const {renderField} = this.props.formData;

        return (
            <div>
                <Panel label={Messages.ExternalSystemService.EditForm.FromName} dataId="viewComponent">
                    <Form dataId="external-system-view-form" buttons={this.getButtons()}>
                        {renderField(IdField)}
                        {renderField(NameField)}
                        {renderField(ConnectTimeoutField)}
                        {renderField(FailurePeriodField)}
                        {renderField(FailurePeriodCountField)}
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
        getExternalSystem: GetExternalSystemAction.name,
        editExternalSystem: EditExternalSystemAction.name,
        removeExternalSystem: RemoveExternalSystemAction.name
    }),
    withFormData,
    withAuthContext,
    withModals({})
)(ViewExternalSystem)
