import {CRUDService, mockRoute} from '@efr/medservice-web-presentation-utils-mock';

const listCurrentStateInfo =
    [{
        id: 1,
        date: "31.01.2019 01:00:00",
        dictName: "TERRORIST",
        fileName: "file1.dbf",
        dictOperation:	"finished",
        size: "274"
    }, {
        id: 2,
        date: "31.01.2019 01:00:00",
        dictName: "BLOCKAGE",
        fileName: "file2.xml",
        dictOperation: 'check',
        size: "3456256"
    }, {
        id: 3,
        date: "31.01.2019 01:00:00",
        dictName: "INVALID_IDENTITY_DOC",
        fileName: "list_of_expired_passports.csv",
        dictOperation: "update",
        size: "345635634"
    }
    ];

const listInfo = {
    "totalElements": listCurrentStateInfo.length,
    "totalPages": 3,
    "last": true,
    "size": 10,
    "number": 0,
    "sort": null,
    "first": true,
    "numberOfElements": 3
};

const listService = new CRUDService(listCurrentStateInfo);

const createModuleMock = () => {

    const UPLOAD_TERRORIST = ({success}) => {
        listService.getRecords()[0].type='check';
        success()
    };

    const GET_TERRORIST_UPLOAD_INFO = ({success, request}) => {
        success({
            "content": listService.getRecords().filter(item =>request.query.page === 'NaN' ? true : request.query.page === '0' ?
                item.id <= request.query.size : item.id > request.query.size),
            "totalElements": listInfo.totalElements,
            "totalPages": listInfo.totalPages,
            "last": request.query.page === '1',
            "size": listInfo.size,
            "number": listInfo.number,
            "sort": listInfo.sort,
            "first": request.query.page === '0',
            "numberOfElements": listInfo.numberOfElements
        })
    };

    return [
        mockRoute.post('/dictionaries/terrorist/update', UPLOAD_TERRORIST),
        mockRoute.get('/dictionaries/status', GET_TERRORIST_UPLOAD_INFO)
    ]
};
export default createModuleMock