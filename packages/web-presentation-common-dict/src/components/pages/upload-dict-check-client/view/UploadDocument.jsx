import React from 'react';
import {
    compose,
    withActions,
    withModals, withFormData
} from '@efr/medservice-web-presentation-core';
import {Button, Field, Input} from '@efr/medservice-web-presentation-ui';

import fetch from "isomorphic-fetch"

export const upload = withFormData.createField(
    'upload', ({onChange, errorMessage}, {title, component, value, onClick, buttonLabel, clear}) => (
        <div className={'dict-field'}>
            <Field title={title} error={errorMessage}
                   value={value}>
                {component}
                <Input type='text' width={'220px'} value={value}
                       disabled={true}
                       dataId={`field-group-field-name-upload`}/>
                <Button name={buttonLabel} onClick={onClick}
                        type={Button.buttonTypes.primary}
                        dataId="button-delete-attached"/>
                {clear && <Button name={'Очистить'} onClick={clear}
                                  type={Button.buttonTypes.primary}
                                  dataId="button-delete-attached"/>}
            </Field>
        </div>)
);

class UploadDocument extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.setFileName = this.setFileName.bind(this);
        this.selectFile = this.selectFile.bind(this);
        this.onChange = this.onChange.bind(this);
        this.upload = this.upload.bind(this);
        this.clear = this.clear.bind(this);

    }


    selectFile(data) {
        let file = data.target.files[0];
        const allowedExtension = this.props.allowedExtension || [];
        if (allowedExtension.indexOf(/(?:\.([^.]+))?$/.exec(file.name)[1]) > -1) {
            this.setState({uploadData: file})
        }
        else {
            this.props.modals.alert({message: "Неверный формат файла. Допустимые форматы файла: " + this.arrayToString(allowedExtension)});
            this.setState({uploadData: undefined});
        }
    }

    setFileName(file) {
        if (file) {
            let formData = new FormData();
            formData.append('content', file);
            this.props.preloader.show();
            fetch(this.props.buildBackendUrl(this.props.uploadUrl), {
                mode: 'no-cors',
                method: "POST",
                body: formData
            }).then((response) => {
                if(response.status === 200) {
                    this.props.onLoad && this.props.onLoad();
                    this.setState({uploadData: undefined});
                } else {
                    this.props.modals.alert({message: "Не удалось загрузить справочник"});
                    console.log(response)
                }
                this.props.preloader.hide();
            })
        }
    }

    arrayToString(arr) {
        let result = '';
        if (arr && arr.length > 0) {
            arr.forEach((item, index) => {
                index === arr.length - 1 ? (result += item) : (result += (item + ', '));
            })
        }
        return result
    }

    onChange() {
        this.fileInput.click()
    }

    upload() {
        this.setFileName(this.state.uploadData)
    }

    clear() {
        this.setState({uploadData: undefined})
    }

    render = () => {
        const {label, formData} = this.props;
        return <div>
            {formData.renderField(upload, {
                title: label,
                value: this.state.uploadData && this.state.uploadData.name,
                component: <input className={'hidden'} ref={e => this.fileInput = e} type="file" name="file"
                                  id="uploaded-file" onChange={this.selectFile}/>,
                onClick: this.state.uploadData ? this.upload : this.onChange,
                buttonLabel: this.state.uploadData ? 'Загрузить' : 'Обзор',
                clear: this.state.uploadData && this.clear
            })}
        </div>
    }
}

export default compose(
    withModals({}),
    withActions(),
    withFormData
)(UploadDocument)
