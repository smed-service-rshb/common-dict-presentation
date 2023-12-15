import React from 'react';
import {compose, PropTypes, withActions, withFormData, withPageRouter} from '@efr/medservice-web-presentation-core';
import {Button, Field, Form, Input, Panel} from '@efr/medservice-web-presentation-ui';
import {BranchesListPage} from '../list'
import {GetBranchActionById} from "../../../../actions";


const IdField = withFormData.createField(
    'id',
    ({value, onChange, errorMessage}) => (
        <Field title='Номер' error={errorMessage} value={value}>
            <Input type='text' value={value} disabled={true} dataId="field-id"/>
        </Field>
    )
);

const SimpleNameField = withFormData.createField(
    'simpleName',
    ({value, onChange, errorMessage}) => (
        <Field title='Сокращенное название' error={errorMessage}>
            <Input type='text' value={value} disabled={true} dataId="field-simpleName"/>
        </Field>
    )
);

const OfficialNameField = withFormData.createField(
    'officialName',
    ({value, onChange, errorMessage}) => (
        <Field title='Полное название' error={errorMessage}>
            <Input type='text' value={value} disabled={true} dataId="field-officialName"/>
        </Field>
    )
);

class BranchViewPage extends React.Component {
    componentDidMount = () => {
        const {getBranch} = this.props.actions;
        getBranch(this.props.id)
            .then(item => {
                this.props.formData.init({
                    [IdField.name]: item.id,
                    [SimpleNameField.name]: item.simpleName,
                    [OfficialNameField.name]: item.officialName,
                })
            })
            .catch(error => {
                alert('Не удалось отобразить требуемую запись');
                throw error
            })
    };

    back = () => {
        this.props.pageRouter.open(BranchesListPage.key);
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
                    <Form buttons={Buttons} dataId="branch-view-form">
                        {renderField(IdField)}
                        {renderField(SimpleNameField)}
                        {renderField(OfficialNameField)}
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
        getBranch: GetBranchActionById.name
    }),
)(BranchViewPage)