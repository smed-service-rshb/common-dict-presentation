import {CRUDService, mockRoute} from '@efr/medservice-web-presentation-utils-mock';


const addresses = [
    {
        id: 1,                     //id записи
        offname: 'Москва',         //Официальное название
        shortname: 'Москва',       //Сокращенное наименование
        level: 'locality',         //Уровень адресной иерархии
        fulladdress: 'Москва',     //Полный адрес
        postalcode: '12311'        //Почтовый адрес
    },
    {
        id: 2,
        offname: 'Вологда',
        shortname: 'Вологда',
        level: 'locality',
        fulladdress: 'Вологда',
        postalcode: '12311'
    },
    {
        id: 3,
        offname: 'Ярославль',
        shortname: 'Ярославль',
        level: 'locality',
        fulladdress: 'Ярославль',
        postalcode: '12311'
    },
    {
        id: 4,
        offname: 'Рыбинск',
        shortname: 'Рыбинск',
        level: 'locality',
        fulladdress: 'Рыбинск',
        postalcode: '12311'
    },
    {
        id: 5,
        offname: 'Воркута',
        shortname: 'Воркута',
        level: 'locality',
        fulladdress: 'Воркута',
        postalcode: '12311'
    },
    {
        id: 6,
        offname: 'Воронеж',
        shortname: 'Воронеж',
        level: 'locality',
        fulladdress: 'Воронеж',
        postalcode: '12311'
    }
]

const streets = [
    {
        id: 7,
        offname: 'Лизюкова',
        shortname: 'Лизюкова',
        level: 'street',
        fulladdress: 'Лизюкова',
        postalcode: '12311'
    },
    {
        id: 8,
        offname: 'Курчатова',
        shortname: 'Курчатова',
        level: 'street',
        fulladdress: 'Курчатова',
        postalcode: '12311'
    },
    {
        id: 9,
        offname: 'Петина',
        shortname: 'Петина',
        level: 'street',
        fulladdress: 'Петина',
        postalcode: '12311'
    }
]

const houses = [
    {
        housenum: '51',
        buildnum: '1',
        strucnum: '3',
        postalcode: '51',
        houseType: 'building',
    },
    {
        housenum: '16',
        buildnum: '1',
        strucnum: '3',
        postalcode: '51',
        houseType: 'building',
    },
    {
        housenum: '41',
        buildnum: '1',
        strucnum: '3',
        postalcode: '51',
        houseType: 'building',
    },
    {
        housenum: '70',
        buildnum: '1',
        strucnum: '3',
        postalcode: '51',
        houseType: 'building',
    },
    {
        housenum: '37',
        buildnum: '1',
        strucnum: '3',
        postalcode: '51',
        houseType: 'building',
    }
]

const addressTree = [
    {
        id: 1,
        tree: [{
            "id": 12,
            "offname": "Московский",
            "shortname": "р-он",
            "level": "area",
            "fulladdress": null,
            "postalcode": "160000"
        }, {
            "id": 13,
            "offname": "Московский",
            "shortname": "о",
            "level": "region",
            "fulladdress": null,
            "postalcode": "160000"
        },{
            "id": 13,
            "offname": "Москва",
            "shortname": "о",
            "level": "locality",
            "fulladdress": null,
            "postalcode": "160000"
        },
        ]
    },
    {
        id: 2,
        tree: [{
            "id": 12,
            "offname": "Вологдский",
            "shortname": "р-он",
            "level": "area",
            "fulladdress": null,
            "postalcode": "160000"
        }, {
            "id": 13,
            "offname": "Вологда",
            "shortname": "о",
            "level": "region",
            "fulladdress": null,
            "postalcode": "160000"
        },{
            "id": 13,
            "offname": "Вологда",
            "shortname": "о",
            "level": "locality",
            "fulladdress": null,
            "postalcode": "160000"
        },
        ]
    },
    {
        id: 3,
        tree: [{
            "id": 12,
            "offname": "Ярославский",
            "shortname": "р-он",
            "level": "area",
            "fulladdress": null,
            "postalcode": "160000"
        }, {
            "id": 13,
            "offname": "Ярославль",
            "shortname": "о",
            "level": "region",
            "fulladdress": null,
            "postalcode": "160000"
        },{
            "id": 13,
            "offname": "Ярославль",
            "shortname": "о",
            "level": "locality",
            "fulladdress": null,
            "postalcode": "160000"
        },
        ]
    },
    {
        id: 4,
        tree: [{
            "id": 12,
            "offname": "Рыбинский",
            "shortname": "р-он",
            "level": "area",
            "fulladdress": null,
            "postalcode": "160000"
        }, {
            "id": 13,
            "offname": "Рыбинск",
            "shortname": "о",
            "level": "region",
            "fulladdress": null,
            "postalcode": "160000"
        },{
            "id": 13,
            "offname": "Рыбинск",
            "shortname": "о",
            "level": "locality",
            "fulladdress": null,
            "postalcode": "160000"
        },
        ]
    },
    {
        id: 5,
        tree: [{
            "id": 12,
            "offname": "Воркутинский",
            "shortname": "р-он",
            "level": "area",
            "fulladdress": null,
            "postalcode": "160000"
        }, {
            "id": 13,
            "offname": "Воркута",
            "shortname": "о",
            "level": "region",
            "fulladdress": null,
            "postalcode": "160000"
        },{
            "id": 13,
            "offname": "Воркута",
            "shortname": "о",
            "level": "locality",
            "fulladdress": null,
            "postalcode": "160000"
        },
        ]
    },
    {
        id: 6,
        tree: [{
            "id": 12,
            "offname": "Воронежский",
            "shortname": "р-он",
            "level": "area",
            "fulladdress": null,
            "postalcode": "160000"
        }, {
            "id": 13,
            "offname": "Воронеж",
            "shortname": "о",
            "level": "region",
            "fulladdress": null,
            "postalcode": "160000"
        },{
            "id": 13,
            "offname": "Воронеж",
            "shortname": "о",
            "level": "locality",
            "fulladdress": null,
            "postalcode": "160000"
        },
        ]
    },
    {
        id: 7,
        tree: [
            {
                "id": 12,
                "offname": "Воронежский",
                "shortname": "р-он",
                "level": "area",
                "fulladdress": null,
                "postalcode": "160000"
            }, {
                "id": 13,
                "offname": "Воронеж",
                "shortname": "о",
                "level": "region",
                "fulladdress": null,
                "postalcode": "160000"
            },{
                "id": 13,
                "offname": "Воронеж",
                "shortname": "о",
                "level": "locality",
                "fulladdress": null,
                "postalcode": "160000"
            },{
                "id": 14,
                "offname": "Лизюкова",
                "shortname": "о",
                "level": "street",
                "fulladdress": null,
                "postalcode": "160000"
            },
        ]
    },
    {
        id: 8,
        tree: [{
            "id": 12,
            "offname": "Ярославский",
            "shortname": "р-он",
            "level": "area",
            "fulladdress": null,
            "postalcode": "160000"
        }, {
            "id": 13,
            "offname": "Ярославль",
            "shortname": "о",
            "level": "region",
            "fulladdress": null,
            "postalcode": "160000"
        },{
            "id": 13,
            "offname": "Ярославль",
            "shortname": "о",
            "level": "locality",
            "fulladdress": null,
            "postalcode": "160000"
        },{
            "id": 13,
            "offname": "Курчатова",
            "shortname": "о",
            "level": "street",
            "fulladdress": null,
            "postalcode": "160000"
        },
        ]
    },
    {
        id: 9,
        tree: [{
            "id": 12,
            "offname": "Вологдский",
            "shortname": "р-он",
            "level": "area",
            "fulladdress": null,
            "postalcode": "160000"
        }, {
            "id": 13,
            "offname": "Вологда",
            "shortname": "о",
            "level": "region",
            "fulladdress": null,
            "postalcode": "160000"
        },{
            "id": 13,
            "offname": "Вологда",
            "shortname": "о",
            "level": "locality",
            "fulladdress": null,
            "postalcode": "160000"
        },{
            id: 14,
            offname: 'Петина',
            shortname: 'Петина',
            level: 'street',
            fulladdress: 'Петина',
            postalcode: '12311'
        }
        ]
    },
]

const addressService = new CRUDService(addresses);
const streetsService = new CRUDService(streets);
const housesService = new CRUDService(houses);
const addressTreeService = new CRUDService(addressTree);


const createModuleMock = () => {
    const ADDRESSES_LIST = ({success, request, error}) => {
        let addresses = [];
        if (request.query.words) {
            if (request.query.parentId) {
                addresses.push(streetsService.getRecord(7));
                addresses.push(streetsService.getRecord(8));
                addresses.push(streetsService.getRecord(9));
            } else {
                addresses = addressService.filterRecords((elem, index) => {
                    if (elem.offname.toLowerCase().indexOf((request.query.words).toLowerCase()) !== -1) {
                        return true;
                    }
                    return false
                })
            }
            success([...addresses]);
        }
    };

    const HOUSES_LIST = ({success, request, error}) => {
        let houses = [];
        if (request.query.house) {
            houses = housesService.filterRecords((elem, index) => {
                if (elem.housenum.indexOf(request.query.house) !== -1) {
                    return true;
                }
                return false
            })
        }
        success([...houses]);
    }

    const PARENTS_TREE = ({success, request, error}) => {
        let result = addressTreeService.getRecord(request.params.id);
        result && success(result.tree);
        !result && error(404);
    }

    return [
        mockRoute.get('/dictionaries/addresses', ADDRESSES_LIST),
        mockRoute.get('/dictionaries/addresses/:id/houses', HOUSES_LIST),
        mockRoute.get('/dictionaries/addresses/:id/parents', PARENTS_TREE),
    ]
}
export default createModuleMock