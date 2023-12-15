import {CRUDService, mockRoute} from '@efr/medservice-web-presentation-utils-mock';

const divisionCodesData =
    [
        {"id":1,"code":"1023","description":"Якутский филиал"},
        {"id":2,"code":"1024","description":"Новый филиал"}
    ];


const divisionCodeService = new CRUDService(divisionCodesData);

const createModuleMock = () => {

    const DIVISION_CODES = ({success}) => {
        success({
                "content": divisionCodeService.getRecords(),
            })
    };

    const GET_DIVISION_CODE_BY_CODE = ({success, request, error}) => {
        const items = divisionCodeService.getRecords();
        let item;
        items.forEach(row => {
            if(row.code === request.query.code)
                item = row;
        });
        item && success(item);
        !item && error(404);
    };

    const DIVISION_CODE = ({success, request, error}) => {
        const item = divisionCodeService.getRecord(request.params.id);
        item && success(item);
        !item && error(404);
    };

    const CREATE_DIVISION_CODE = ({success, request, error}) => {

        if (request.body.name !== 'ERROR') {
            request.body.id = (Math.round(Math.random() * 1000000) + 20).toString();
            divisionCodeService.createRecord(request.body);
            success(request.body);
        } else {
            error(404);
        }
    };

    return [
        mockRoute.get('/dictionaries/division-codes/:id', DIVISION_CODE),
        mockRoute.get('/dictionaries/division-by-code', GET_DIVISION_CODE_BY_CODE),
        mockRoute.get('/dictionaries/division-codes', DIVISION_CODES),
        mockRoute.post('/dictionaries/division-code-create/', CREATE_DIVISION_CODE)
    ]
};
export default createModuleMock