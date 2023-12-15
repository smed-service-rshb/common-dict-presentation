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
import {Button, Checkbox, Divider, Field, Form, Input, Panel, Select} from '@efr/medservice-web-presentation-ui';
import Messages from "../../../messages";
import {
    GetCurrencyActiveRateAction,
    GetCurrencyAction,
    GetCurrencyRateAction,
    GetCurrencyRateSettingsAction,
    SaveCurrencyRateAction,
    CreateCurrencyRateAction
} from "../../../../actions";
import {Rights} from '@efr/medservice-web-presentation-authentication'

let viewMode = true;

export const numberMask = (integerLimit, decimalLimit, showThousandsSeparatorSymbol) => Input.getNumberMask({
    integerLimit: integerLimit,
    decimalLimit: decimalLimit,
    showThousandsSeparatorSymbol: showThousandsSeparatorSymbol
});

export const createSelectField = (fieldName, validation, startValue, width) => withFormData.createField(
    fieldName, ({value, onChange, setFieldValue, errorMessage}, {options, viewMode, update}) => (
        <Field title={Messages.CurrencyRate[fieldName]} error={errorMessage} value={value}>
            <Select options={options} value={value !== undefined ? value : startValue}
                    onChange={(v) => {
                        onChange(v.value);
                        update(v.value, setFieldValue)
                    }}
                    dataId={`field-group-field-name-${fieldName}`}
                    disabled={viewMode} error={!!errorMessage} width={width || '220px'}/>
        </Field>
    ), validation
);

export const createTextField = (fieldName) => withFormData.createField(
    fieldName, ({value}) => (
        <Field title={Messages.CurrencyRate[fieldName]} value={value}>
            {value}
        </Field>
    )
);

export const createNumberField = (fieldName, validation) => withFormData.createField(
    fieldName, ({value, onChange, errorMessage}, {viewMode}) => (
        <Field title={Messages.CurrencyRate[fieldName]} error={errorMessage} value={value}>
            <Input type='text' error={!!errorMessage} width={'100px'} value={value}
                   mask={numberMask(4, 4, false)} placeholder={' '} disabled={viewMode} onChange={onChange}
                   dataId={`field-group-field-name-${fieldName}`}/>
        </Field>), validation
);

export const createCheckboxField = (fieldName, description, validation) => withFormData.createField(
    fieldName, ({errorMessage}, {value, viewMode}) => (
        <Field title={Messages.CurrencyRate[fieldName]} error={errorMessage}>
            <div className={'checkbox-for-dict'}>
                <Checkbox checked={value}
                          dataId={`field-group-field-name-${fieldName}`}
                          description={description}
                          disabled={viewMode} error={!!errorMessage} width='500px'/>
            </div>
        </Field>
    ), validation
);

const currencyField = createSelectField('currencyId',
    ({validator}) => ([validator.required('Значение поля "Валюта" должно быть заполнено')]));
const startDate = createTextField('startDate');
const endDate = createTextField('endDate');
const rateField = createNumberField('rate',
    ({validator}) => ([validator.regexp('Значение поля "Курс ЦБ РФ" не может иметь значение 0', /[^0]/),
        validator.required('Значение поля "Курс ЦБ РФ" должно быть заполнено')]));
const innerRate = createNumberField('innerRate',
    ({validator}) => ([validator.regexp('Значение поля "Курс Организации" не может иметь значение 0', /[^0]/),
        validator.required('Значение поля "Курс Организации" должно быть заполнено')]));
const edited = createCheckboxField('edited');

const validationForm = () => {
    const fields = [
        currencyField, rateField, innerRate
    ];

    return withFormData.createValidationForm(fields);
};

let editedValue = false;

class ViewBank extends Component {

    state = {};

    constructor(props) {
        super(props);
        this.updateCurrency = this.updateCurrency.bind(this);
    }

    componentDidMount = () => {
        viewMode = true;
        const {getRate, getCurrenciesList, getSetting} = this.props.actions;
        getCurrenciesList()
            .then(responce => {
                this.setState({
                    currencies: responce.content
                        .map(item => ({
                            label: item.literalISO,
                            value: item.id + ''
                        }))
                })
            });
        !!this.props.id && getRate(this.props.id)
            .then(rate => {
                editedValue = !rate.edited;
                this.setState({rate: rate.rate});
                this.props.formData.init({...rate});
            })
            .catch(error => {
                this.back();
                this.props.modals.alert({message: Messages.CurrencyRate.getDateError});
            });
        if (!this.props.id) {
            viewMode = false;
            getSetting().then(setting => this.setState({...setting}))
                .catch(console.info);
            editedValue = false;
        }
    };

    back = () => {
        this.props.pageRouter.back();
    };

    save = (data) => {
        this.props.actions.saveRate(this.props.id, data)
            .then(() => {
                this.back();
                this.props.modals.alert({message: "Курс сохранен"});
            }).catch((er) => {
            console.info(er);
            this.props.modals.alert({message: 'Произошла ошибка при сохранении курса'});
        })
    };

    create = (data) => {
        this.props.actions.createRate(data)
            .then(() => {
                this.back();
                this.props.modals.alert({message: "Курс создан"});
            }).catch((er) => {
            console.info(er);
            this.props.modals.alert({message: 'Произошла ошибка при сохранении курса'});
        })
    };

    updateCurrency = (currencyId, setFieldValue) => {
        const {calculationType, additionalPercent} = this.state;
        this.props.actions.getActive(currencyId)
            .then(responce => {
                let innerRate = undefined;
                switch (calculationType) {
                    case "CB_RF_RATE":
                        innerRate = responce.rate;
                        break;
                    case "CB_RF_WITH_PERCENT":
                        innerRate = responce.rate * (1 + additionalPercent / 100);
                        break;
                    default:
                }
                this.props.formData.init({
                    currencyId: currencyId,
                    rate: responce.rate,
                    innerRate: innerRate
                })
            })
    };

    getButtons() {
        const {validate} = this.props.formData;
        const Buttons = [];
        this.props.authContext.checkPermission(Rights.EDIT_BUSINESS_DICTIONARIES) &&
        !viewMode && Buttons.push(<Button key="save" name={Messages.CurrencyRate.Save} dataId="button-save"
                                          onClick={() => {
                                              return validate(validationForm(), !!this.props.id ? this.save : this.create, data => {
                                              })()
                                          }}/>);
        viewMode && Buttons.push(<Button key="change" name={"Редактировать"} dataId="button-change"
                                         onClick={() => {
                                             viewMode = !viewMode;
                                             this.setState({viewMode: viewMode})
                                         }}/>);
        Buttons.push(<Button key="back" name={Messages.BanksService.ButtonsName.Back} dataId="button-back"
                             onClick={this.back}/>);
        return Buttons;
    };

    render = () => {
        const {renderField} = this.props.formData;
        const {currencies} = this.state;
        const {id} = this.props;
        return (
            <div>
                <Panel labelSecondary={Messages.CurrencyRate.panelName} dataId="viewComponent">
                    <Form dataId="bank-view-form" buttons={this.getButtons()}>
                        {renderField(currencyField, {options: currencies, viewMode: !!id, update: this.updateCurrency})}
                        {!!id && renderField(startDate)}
                        {!!id && renderField(endDate)}
                        {renderField(rateField, {viewMode})}
                        {renderField(innerRate, {viewMode})}
                        {renderField(edited, {viewMode: true, value: editedValue})}
                        <Divider/>
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
        getRate: GetCurrencyRateAction.name,
        getCurrenciesList: GetCurrencyAction.name,
        saveRate: SaveCurrencyRateAction.name,
        getSetting: GetCurrencyRateSettingsAction.name,
        getActive: GetCurrencyActiveRateAction.name,
        createRate: CreateCurrencyRateAction.name
    }),
    withFormData,
    withAuthContext,
    withModals({})
)(ViewBank)
