import {CRUDService, mockRoute} from '@efr/medservice-web-presentation-utils-mock';

const offices = [
    {"id":1,"rfId":1,"simpleName":"moscow","officialName":"Головной офис Россельхозбанк","postAddress":"г.Москва, ул. Арбат 2","phone":"+49590012311","startTime":"08:00","endTime":"18:00"},
    {"id":2,"rfId":2,"simpleName":"vologda","officialName":"Вологодский офис","postAddress":"г.Вологда, ул. Петина 4","phone":"+79511001020","startTime":"08:00","endTime":"18:00"},
    {"id":3,"rfId":3,"simpleName":"sevastopol","officialName":"Севастопольский офис","postAddress":"г.Севастополь, ул. Мюнхаузена 3 4","phone":"+78692200100","startTime":"08:00","endTime":"18:00"},
    {"id":4,"rfId":4,"simpleName":"bryansk","officialName":"Брянский офис","postAddress":"г.Брянск, ул. Ленина 12","phone":"+74832000000","startTime":"08:00","endTime":"18:00"},
    {"id":5,"rfId":5,"simpleName":"tver","officialName":"Тверской офис","postAddress":"г.Тверь, ул. Мира 20","phone":"+48210090000","startTime":"08:00","endTime":"18:00"}
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

const officeService = new CRUDService(offices);

const createModuleMock = () => {

    const OFFICES_LIST = ({success, request, error}) => {
        let offices = {
            "content": officeService.getRecords(),
            "totalElements": listInfo.totalElements,
            "totalPages": listInfo.totalPages,
            "last": listInfo.last,
            "size": listInfo.size,
            "number": listInfo.number,
            "sort": listInfo.sort,
            "first": listInfo.first,
            "numberOfElements": listInfo.numberOfElements
        };

        offices && success(offices);
        !offices && error(404);
    };

    const OFFICE_INFO = ({success, request, error}) => {
        let office = officeService.getRecord(request.params.id);

        office && success(office);
        !office && error(404);
    };

    return [
        mockRoute.get('/dictionaries/offices', OFFICES_LIST),
        mockRoute.get('/dictionaries/offices/:id', OFFICE_INFO)
    ]
};
export default createModuleMock