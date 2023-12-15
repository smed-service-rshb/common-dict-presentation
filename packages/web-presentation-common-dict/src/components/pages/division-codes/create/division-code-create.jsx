import React, {Component} from 'react';
import {
    compose,
    withActions,
    withFormData,
    withPageRouter,
    withAuthContext,
    withModals
} from '@efr/medservice-web-presentation-core';
import {Input, Field, Panel, Form, Button} from '@efr/medservice-web-presentation-ui';
import {DivisionCodesListPage} from "../list";
import permissions from '../../../../permissions'
import {CreateDivisionCodeAction} from "../../../../actions";
import Messages from "../../../messages"

const CodeField = withFormData.createField(
    'code',
    ({value, onChange, errorMessage}) => (
        <Field title='Код' error={errorMessage}>
            <Input type='text' value={value} onChange={onChange} error={!!errorMessage} dataId="field-code"/>
        </Field>
    ),
    ({validator}) => ([
        validator.required("Поле 'Код' обязательно для заполнения"),
    ])

);

const DescriptionField = withFormData.createField(
    'description',
    ({value, onChange, errorMessage}) => (
        <Field title='Описание' error={errorMessage}>
            <Input type='text' value={value} onChange={onChange} error={!!errorMessage} dataId="field-description"/>
        </Field>
    ),
    ({validator}) => ([
        validator.required("Поле 'Описание' обязательно для заполнения"),
    ])
);

const validationForm = () => {
    const fields = [
        CodeField, DescriptionField
    ];

    return withFormData.createValidationForm(fields);
};


class CreateDivisionCode extends Component {

    back = () => {
        this.props.pageRouter.open(DivisionCodesListPage.key);
    };

    create = data => {
        const {createDivisionCode} = this.props.actions;
        createDivisionCode(data).then(result => {
            this.props.modals.alert({message: "Подразделение создано"});
            this.back();
        }).catch(error => {
            this.props.modals.alert({message: "Не удалось создать подразделение"});
            console.log(error);
        })
    };


    getButtons() {
        const {validate} = this.props.formData;

        const Buttons = [<Button key="back" name="Назад" dataId="button-back" onClick={this.back}/>];

        if (this.props.authContext.checkPermission(permissions.CREATE_DIVISION_CODE)) {
            const createButton = [<Button key="create" name="Создать" dataId="button-create" onClick={
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
                    <Form dataId="division-code-create-form" buttons={this.getButtons()}>
                        {renderField(CodeField)}
                        {renderField(DescriptionField)}
                    </Form>
                </Panel>
            </div>
        )
    }

}

export default compose(
    withPageRouter,
    withActions({
        createDivisionCode: CreateDivisionCodeAction.name
    }),
    withFormData,
    withAuthContext,
    withModals({})
)(CreateDivisionCode)
