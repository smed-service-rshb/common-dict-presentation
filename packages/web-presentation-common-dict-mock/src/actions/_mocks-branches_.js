import {CRUDService, mockRoute} from '@efr/medservice-web-presentation-utils-mock';

const branchesData = [
    {"id": 1, "code": "6300", "simpleName": "vologda", "officialName": "Вологодский филиал"},
    {"id": 2, "code": "6500", "simpleName": "moscow", "officialName": "Московский главный офис"},
    {"id": 3, "code": "5400", "simpleName": "saint-p", "officialName": "Петербургский филиал"},
    {"id": 4, "code": "5300", "simpleName": "kaliningr", "officialName": "Калининградский филиал"},
    {"id": 5, "code": "6100", "simpleName": "omsk", "officialName": "Омский филиал"}
];


const branchService = new CRUDService(branchesData);

const createModuleMock = () => {

    const BRANCHES = ({success}) => {
        success(
            {
                "content": branchService.getRecords(),
            })
    };

    const BRANCH = ({success, request, error}) => {
        let item = branchService.getRecord(request.params.id);

        item && success(item);
        !item && error(404);
    };

    return [
        mockRoute.get('/dictionaries/branches/:id', BRANCH),
        mockRoute.get('/dictionaries/branches', BRANCHES)
    ]
};
export default createModuleMock