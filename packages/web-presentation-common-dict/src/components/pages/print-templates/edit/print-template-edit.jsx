import React from 'react';
import {Rights} from '@efr/medservice-web-presentation-authentication'
import {Button, Field, Form, Input, Panel} from '@efr/medservice-web-presentation-ui';
import {
    compose,
    PropTypes,
    withActions,
    withAuthContext,
    withFormData,
    withModals,
    withPageRouter
} from '@efr/medservice-web-presentation-core';
import {PrintTemplatesListPage} from "../list";
import {contentField, copiesCountField} from './form-data'
import {SavePrintTemplateAction, GetPrintTemplateAction} from "../../../../actions";
import fomTypes from "../fomTypes";

const validationForm = () => {
    return withFormData.createValidationForm([
        copiesCountField,
        contentField
    ]);
};

const NOP = (_) => (_);

class PrintTemplateComponent extends React.Component {
    constructor(props) {
        super(props);
        this.templateData = {};
        this.buildBackendUrl = props.buildBackendUrl;

        this.buttons = [];
        if (props.authContext.checkPermission(Rights.EDIT_BUSINESS_DICTIONARIES)) {
            this.buttons.push(<Button key="save" name="Сохранить" dataId="button-save"
                                      onClick={this.props.formData.validate(validationForm(), this._save, NOP)}/>);
        }
        this.buttons.push(<Button key="cancel" name="Отмена" type={Button.buttonTypes.secondary} dataId="button-cancel"
                                  onClick={this._back}/>);
    }

    componentDidMount = () => {
        this.props.actions.getTemplate(this.props.type)
            .then(item => {
                this.templateData = item;
                this.props.formData.init({
                    [copiesCountField.name]: item.copiesNumber,
                })
            })
    };

    _back = () => {
        this.props.pageRouter.open(PrintTemplatesListPage.key);
    };

    _save = data => {
        const result = data[contentField.name] ?
            this.uploader.upload(this.buildBackendUrl(`/dictionaries/print-templates/${this.templateData.type}`, data))
            :
            this.props.actions.saveTemplate({...data, type: this.props.type});
        result
            .then(data => new Promise(resolve => {
                this.props.modals.alert({message: "Печатная форма успешно сохранена"})
                    .on('success', () => resolve(data));
            }))
            .then(this._back)
            .catch(error => {
                console.log(error);
                this.props.modals.alert({message: "Не удалось сохранить печатную форму"});
            })
    };

    _renderField = this.props.formData.renderField;

    render = () => (
        <div>
            <Panel label="Печатная форма" dataId="print-template-panel">
                <Form dataId="print-template-form" buttons={this.buttons}>
                    <Field title='Тип печатной формы'>
                        <Input value={fomTypes[this.props.type] || this.props.type} dataId='field-formType' disabled/>
                    </Field>
                    {this._renderField(copiesCountField)}
                    {this._renderField(contentField, {owner: this})}
                </Form>
            </Panel>
        </div>
    );

    static propTypes = {
        /**
         * Тип печатной формы
         */
        type: PropTypes.string.isRequired,
    };
}

export default compose(
    withPageRouter,
    withAuthContext,
    withFormData,
    withModals(),
    withActions({
        saveTemplate: SavePrintTemplateAction.name,
        getTemplate: GetPrintTemplateAction.name

    }),
)(PrintTemplateComponent);