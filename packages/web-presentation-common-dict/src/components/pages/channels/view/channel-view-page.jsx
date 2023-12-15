import React from 'react';
import {PropTypes, compose, withActions, withFormData, withPageRouter} from '@efr/medservice-web-presentation-core';
import {Button, Input, Panel, Field, Form} from '@efr/medservice-web-presentation-ui';
import {ChannelsListPage} from "../list";
import {GetChannelAction} from "../../../../actions";


const IdField = withFormData.createField(
    'id',
    ({value, onChange, errorMessage}) => (
        <Field title='Номер' error={errorMessage} value={value}>
            <Input type='text' value={value} disabled={true} dataId="field-id"/>
        </Field>
    )
);

const ShortNameField = withFormData.createField(
    'shortName',
    ({value, onChange, errorMessage}) => (
        <Field title='Сокращенное название' error={errorMessage}>
            <Input type='text' value={value} disabled={true} dataId="field-shortName"/>
        </Field>
    )
);

const FullNameField = withFormData.createField(
    'fullName',
    ({value, onChange, errorMessage}) => (
        <Field title='Полное название' error={errorMessage}>
            <Input type='text' value={value} disabled={true} dataId="field-fullName"/>
        </Field>
    )
);

class ChannelViewPage extends React.Component {

    componentDidMount = () => {
        const {getChannel} = this.props.actions;
        getChannel(this.props.id)
            .then(channel => {
                this.props.formData.init({
                    [IdField.name]: channel.id,
                    [ShortNameField.name]: channel.shortName,
                    [FullNameField.name]: channel.fullName,
                })
            })
            .catch(error => {
                alert('Не удалось получить данные по каналу');
                throw error
            })
    };

    back = () => {
        this.props.pageRouter.open(ChannelsListPage.key);
    }

    render = () => {
        const {renderField} = this.props.formData;

        const Buttons = [
            <Button key="back"
                    name="Назад"
                    dataId="button-back"
                    onClick={this.back}
            />
        ]

        return (
            <div>
                <Panel label="Канал" dataId="viewComponent">
                    <Form buttons={Buttons} dataId="channel-view-form">
                        {!!this.props.id && renderField(IdField)}
                        {renderField(ShortNameField)}
                        {renderField(FullNameField)}
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
        getChannel: GetChannelAction.name
    })
)(ChannelViewPage)