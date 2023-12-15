import React from 'react';
import {withFormData} from '@efr/medservice-web-presentation-core';
import {Field, FileUpload, FileDownload, Input} from '@efr/medservice-web-presentation-ui';

const copiesCountFieldMeta = {
    key: 'copiesNumber',
    name: 'Количество экземпляров',
};

export const copiesCountField = withFormData.createField(
    copiesCountFieldMeta.key,
    ({value, onChange, errorMessage}) => (
        <Field title={copiesCountFieldMeta.name} error={errorMessage} required>
            <Input type='text' mask={[/\d/, /\d/, /\d/]} value={value} onChange={onChange} dataId={`field-${copiesCountFieldMeta.key}`}
                   error={!!errorMessage}/>
        </Field>
    ),
    ({validator}) => ([
        validator.required(`Поле '${copiesCountFieldMeta.name}' обязательно для заполнения.`),
    ])
);

const contentFieldMeta = {
    key: 'content',
    name: 'Шаблон',
};
export const contentField = withFormData.createField(
    contentFieldMeta.key,
    ({value, setValue, errorMessage}, {owner}) => (
        <Field title={contentFieldMeta.name} error={errorMessage}>
            <FileDownload
                dataId={`field-download-${contentFieldMeta.key}`}
                name={owner.templateData.fileName || ''}
                action={owner.buildBackendUrl(`/dictionaries/print-templates/${owner.templateData.type}/content`)}/>
            <FileUpload.IFrame ref={ref => owner.uploader = ref}
                               dataId={`field-upload-${contentFieldMeta.key}`}
                               name="content"
                               onFileChange={setValue}
            />
        </Field>
    )
);