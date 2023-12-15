import React from 'react';
import {PropTypes, compose, withActions, withFormData, withPageRouter} from '@efr/medservice-web-presentation-core';
import {Button, Input, Panel, Field, Form} from '@efr/medservice-web-presentation-ui';
import {DivisionCodesListPage} from "../list";
import {GetDivisionCodeAction} from "../../../../actions";


const IdField = withFormData.createField(
    'id',
    ({value, onChange, errorMessage}) => (
        <Field title='Номер' error={errorMessage} value={value}>
            <Input type='text' value={value} disabled={true} dataId="field-id"/>
        </Field>
    )
);

const CodeField = withFormData.createField(
    'code',
    ({value, onChange, errorMessage}) => (
        <Field title='Код' error={errorMessage}>
            <Input type='text' value={value} disabled={true} dataId="field-code"/>
        </Field>
    )
);

const DescriptionField = withFormData.createField(
    'description',
    ({value, onChange, errorMessage}) => (
        <Field title='Описание' error={errorMessage}>
            <Input type='text' value={value} disabled={true} dataId="field-description"/>
        </Field>
    )
);

class DivisionCodeViewPage extends React.Component {
    componentDidMount = () => {
        const {getDivisionCode} = this.props.actions;
        getDivisionCode(this.props.id)
            .then(item => {
                this.props.formData.init({
                    [IdField.name]: item.id,
                    [CodeField.name]: item.code,
                    [DescriptionField.name]: item.description,
                })
            })
            .catch(error => {
                alert('Не удалось отобразить требуемую запись');
                throw error
            })
    };

    back = () => {
        this.props.pageRouter.open(DivisionCodesListPage.key);
    };

    render = () => {
        const {renderField} = this.props.formData;

        const Buttons = [
            <Button key="back"
                    name="Назад"
                    dataId="button-back"
                    onClick={this.back}
            />
        ];

        return (
            <div>
                <Panel label="Филиал" dataId="viewComponent">
                    <Form buttons={Buttons} dataId="division-code-view-form">
                        {renderField(IdField)}
                        {renderField(CodeField)}
                        {renderField(DescriptionField)}
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
    withFormData,
    withPageRouter,
    withActions({
        getDivisionCode: GetDivisionCodeAction.name
    }),
)(DivisionCodeViewPage)