import React from 'react';

import {Rights} from '@efr/medservice-web-presentation-authentication'
import {compose, withActions, withAuthContext, withModals, withPageRouter} from '@efr/medservice-web-presentation-core';
import {FileDownload, FileUpload, Panel, Spreadsheet} from '@efr/medservice-web-presentation-ui';
import {GetPrintTemplatesListAction} from "../../../../actions";

import {PrintTemplateEditPage} from '../edit'

import fomTypes from '../fomTypes'

class ContentItemClass extends React.Component {
    _handleAttach = filename => {
        if (!filename) {
            return; //Вызван на componentWillUnmount
        }
        this.uploader.upload(this.props.uploadAction)
            .then(() => {
                this.uploader.reset();
                this.props.modals.alert({message: "Печатная форма успешно обновлена"});
            })
            .catch(error => {
                console.log(error);
                this.props.modals.alert({message: "Не удалось обновить печатную форму"});
            })
            .then(this.props.refresh)

    };
    render = () => (
        <div>
            <FileDownload dataId={`download-${this.props.data.name}`} name={this.props.data.fileName}
                          action={this.props.downloadAction}/>
            <FileUpload.IFrame
                ref={ref => this.uploader = ref}
                dataId={`attach-${this.props.data.name}`}
                name="content"
                onFileChange={this._handleAttach}/>
        </div>
    )
}

const ContentItem = withModals()(ContentItemClass);

const buildColumns = ({refresh, edit, buildBackendUrl}) => [
    {
        key: 'type',
        name: 'Тип печатной формы',
        data: data => <div onClick={edit(data)}>
            {data.name}
        </div>
    },
    {
        key: 'copiesNumber',
        name: 'Количество экземпляров',
    },
    {
        key: 'operations',
        name: 'Шаблон',
        data: data => (
            <ContentItem
                downloadAction={buildBackendUrl(`/dictionaries/print-templates/${data.type}/content`)}
                uploadAction={buildBackendUrl(`/dictionaries/print-templates/${data.type}`, data)}
                data={data}
                refresh={refresh}
            />)
    },
];

const PrintTemplatesTable = ({templates, columns}) => (<Spreadsheet columns={columns} rows={templates}/>);

class PrintTemplatesListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.columns = buildColumns({
            edit: this.handleEdit,
            refresh: this.fetchTemplates,
            buildBackendUrl: this.props.buildBackendUrl
        })
    }

    state = {
        templates: []
    };

    componentDidMount = () => {
        this.fetchTemplates();
    };

    fetchTemplates = () => {
        return this.props.actions.listTemplates()
            .then(templates => templates.map(item => ({...item, name: fomTypes[item.type] || item.type})))
            .then(templates => this.setState({
                templates: templates.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                })
            }));
    };

    handleEdit = data => () => {
        this.props.authContext.checkPermission(Rights.EDIT_BUSINESS_DICTIONARIES) &&
        this.props.pageRouter.open(PrintTemplateEditPage.key, {type: data.type});
    };

    render = () => (
        <Panel label="Печатные формы" dataId="print-templates-list-panel">
            <PrintTemplatesTable templates={this.state.templates} columns={this.columns}/>
        </Panel>
    )
}

export default compose(
    withPageRouter,
    withAuthContext,
    withActions({
        listTemplates: GetPrintTemplatesListAction.name
    })
)(PrintTemplatesListComponent);
