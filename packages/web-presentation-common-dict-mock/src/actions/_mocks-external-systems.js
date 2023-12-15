import {CRUDService, mockRoute} from '@efr/medservice-web-presentation-utils-mock';

const listExternalSystems = [
    {"id":1,"name":"Интербанк","systemType":"DBO","systemId":"DBO","connectTimeout":10000,"failurePeriod":100000,"failurePeriodCount":5},
    {"id":2,"name":"БИСКВИТ Вологда","systemType":"BISQUIT","systemId":"BISQUIT:6300","connectTimeout":20000,"failurePeriod":200000,"failurePeriodCount":5},
    {"id":3,"name":"БИСКВИТ Москва","systemType":"BISQUIT","systemId":"BISQUIT:6500","connectTimeout":30000,"failurePeriod":300000,"failurePeriodCount":5},
    {"id":4,"name":"ПЦ","systemType":"PC","systemId":"PC","connectTimeout":45000,"failurePeriod":450000,"failurePeriodCount":10},
    {"id":5,"name":"ЦИФ","systemType":"CIF","systemId":"CIF","connectTimeout":55000,"failurePeriod":550000,"failurePeriodCount":10}
];

const listInfo = {
    "totalElements": 5,
    "totalPages": 1,
    "last": true,
    "size": 50,
    "number": 0,
    "sort": null,
    "first": true,
    "numberOfElements": 5
};

const listService = new CRUDService(listExternalSystems);

const createModuleMock = () => {

    const externalSystems = ({success}) => {
        success(
            {
                "content": listService.getRecords(),
                "totalElements": listInfo.totalElements,
                "totalPages": listInfo.totalPages,
                "last": listInfo.last,
                "size": listInfo.size,
                "number": listInfo.number,
                "sort": listInfo.sort,
                "first": listInfo.first,
                "numberOfElements": listInfo.numberOfElements
            })
    };

    const viewExternalSystem = ({success, request, error}) => {

        if (parseInt(request.params.id, 10) === 6) {
            error(404);
        } else {
            let viewExternalSystem = listService.getRecord(request.params.id);
            viewExternalSystem && success(viewExternalSystem);
        }
    };

    const editExternalSystem = ({success, request, error}) => {
        if (parseInt(request.params.id, 10) === 7) {
            error(404);
        } else {
            listService.updateRecord(request.params.id, request.body);
            let viewExternalSystem = listService.getRecord(request.params.id);

            viewExternalSystem && success(viewExternalSystem);
            !viewExternalSystem && error(404);
        }
    };

    const removeExternalSystem = ({success, request, error}) => {

        if (parseInt(request.params.id, 10) !== 8) {
            listService.deleteRecord(request.params.id);
            let viewExternalSystem = listService.getRecord(request.params.id);

            !viewExternalSystem && success(204);
            viewExternalSystem && error(404);
        } else {
            error(404);
        }
    };

    const createExternalSystem = ({success, request, error}) => {

        if (request.body.name !== 'ERROR') {
            request.body.id = (Math.round(Math.random() * 1000000) + 20).toString();
            listService.createRecord(request.body);
            success(request.body);
        } else {
            error(404);
        }
    };

    return [
        mockRoute.get('/dictionaries/external-systems', externalSystems),
        mockRoute.get('/dictionaries/external-systems/:id', viewExternalSystem),
        mockRoute.put('/dictionaries/external-systems/:id', editExternalSystem),
        mockRoute.delete('/dictionaries/external-systems/:id', removeExternalSystem),
        mockRoute.post('/dictionaries/external-systems/', createExternalSystem)
    ]
};
export default createModuleMock