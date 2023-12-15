import React, {Component} from 'react';
import {
    compose,
    withActions,
    withFormData,
    withPageRouter,
    withAuthContext,
    withModals
} from '@efr/medservice-web-presentation-core';
import {Input, Panel, Field, Form, Button} from '@efr/medservice-web-presentation-ui';
import {ExternalSystemsListPage} from "../list";
import permissions from '../../../../permissions'
import Messages from "../../../messages";
import {CreateExternalSystemAction} from "../../../../actions";

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


class CreateExternalSystem extends Component {

    back = () => {
        this.props.pageRouter.open(ExternalSystemsListPage.key);
    };

    create = data => {
        const {createExternalSystem} = this.props.actions;
        createExternalSystem(data).then(result => {
            this.props.modals.alert({message: Messages.ExternalSystemService.Responses.CreatingIsSuccess});
            this.back();
        }).catch(error => {
            this.props.modals.alert({message: Messages.ExternalSystemService.ErrorMessages.CreatingIsNotSuccess});
            console.log(error);
        })
    };


    getButtons() {
        const {validate} = this.props.formData;

        const Buttons = [<Button key="back" name="Назад" dataId="button-back" onClick={this.back}/>];

        if (this.props.authContext.checkPermission(permissions.CREATE_EXTERNAL_SYSTEM)) {
            const createButton = [<Button key="create" name={Messages.ExternalSystemService.ButtonsName.Create} dataId="button-create" onClick={
                validate(validationForm(), this.create, data => {})}/>
            ];
            Buttons.push(createButton);
        }

        return Buttons;
    };

    render () {
        const {renderField} = this.props.formData;

        return (
            <div>
                <Panel label={Messages.ExternalSystemService.EditForm.FromName} dataId="viewComponent">
                    <Form dataId="external-system-create-form" buttons={this.getButtons()}>
                        {renderField(NameField)}
                        {renderField(ConnectTimeoutField)}
                        {renderField(FailurePeriodField)}
                        {renderField(FailurePeriodCountField)}
                    </Form>
                </Panel>
            </div>
        )
    }

}

export default compose(
    withPageRouter,
    withActions({
        createExternalSystem: CreateExternalSystemAction.name
    }),
    withFormData,
    withAuthContext,
    withModals({})
)(CreateExternalSystem)
