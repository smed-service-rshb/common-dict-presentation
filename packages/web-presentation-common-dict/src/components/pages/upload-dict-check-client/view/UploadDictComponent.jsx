import React from 'react';
import {compose, withActions, withPageRouter, withFormData} from '@efr/medservice-web-presentation-core';
import {Panel} from '@efr/medservice-web-presentation-ui'
import Grid from '@efr/medservice-web-presentation-authentication/src/components/grid'
import '../styles.css'
import Messages from "../../../messages";
import {GetCurrentStateDataAction} from "../../../../actions";
import UploadDocument from "./UploadDocument";
import {uploadBlockagesUrl, uploadTerroristsUrl} from "./constants";

const prepareSize = (size) => {
    if (!size) return size;
    let sizeString = (Math.round((size / 1024 / 1024) * 100) / 100) + '';
    return (sizeString === '0' ? '0.01' : sizeString) + ' Мб';
};

const terroristExtansions = ['dbf'];
const blockagesExtansions = ['xml'];


const getValue = (key, value) => {
    switch (key) {
        case 'size':
            return prepareSize(value);
        case 'dictName':
        case 'dictOperation':
            return Messages.UploadLabel[value];
        default:
            return value
    }
};

const columns = [
    {name: "Наименование справочника", key: 'dictName', data: data => getValue('dictName', data)},
    {name: "Дата выполнения загрузки", key: 'date', data: data => <div className={'center'}>{getValue('date', data)}</div>},
    {name: "Наименование файла", key: 'fileName', data: data => <div className={'center'}>{getValue('fileName', data)}</div>},
    {name: "Объем файла", key: 'size', data: data => <div className={'center'}>{getValue('size', data)}</div>},
    {name: "Статус", key: 'dictOperation', data: data => <div className={'center'}>{getValue('dictOperation', data)}</div>}
];

class UploadDictComponent extends React.Component {
    state = {
        office: {}
    };

    constructor(props) {
        super(props);
        this.updateGrid = this.updateGrid.bind(this);
        this.dataSource = Grid.createDataSource({
            getData: this.getData,
            gridName: 'UPLOAD_DICT_INFO_LIST'
        });
    }

    componentDidMount() {
        this.getDictionariesInfo();
    }

    getData = (...params) => {
        return this.props.actions.getDictionariesInfo(...params)
            .then((responce) => ({
                rows: responce.content,
                hasMore: !responce.last,
                totalElements: responce.totalElements,
                totalPages: responce.totalPages,
                last: responce.last,
                size: responce.size,
                page: responce.number,
                sort: responce.sort,
                first: responce.first,
                numberOfElements: responce.numberOfElements,
            }))
    };

    getDictionariesInfo() {
        this.props.actions.getDictionariesInfo()
            .then(response => this.setState({...response}))
            .catch(console.log)
    }

    updateGrid = () => {
        const grid = this.grid;
        setTimeout(function () {
            grid.refresh();
        }, 500)
    };

    render() {
        return (
            <Panel label="Загрузка справочников для проверок" dataId="upload-panel">
                <UploadDocument allowedExtension={terroristExtansions} uploadUrl={uploadTerroristsUrl}
                                onLoad={this.updateGrid} label={Messages.UploadLabel.terrorists}/>
                <UploadDocument allowedExtension={blockagesExtansions} uploadUrl={uploadBlockagesUrl}
                                onLoad={this.updateGrid}
                                label={Messages.UploadLabel.blockages}/>
                <div className={"upload-check-dict-grid"}>
                    <Grid
                    columns={columns}
                    dataSource={this.dataSource}
                    dataId={'check-list'}
                    checkboxDisabled={true}
                    emptyMessage={'Нет данных для отображения'}
                    ref={(element) => {
                        this.grid = element;
                    }}/>
                </div>
            </Panel>
        )
    }
}

export default compose(
    withPageRouter,
    withFormData,
    withActions({
        getDictionariesInfo: GetCurrentStateDataAction.name
    })
)(UploadDictComponent);