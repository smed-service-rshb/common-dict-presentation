import {CRUDService, mockRoute} from '@efr/medservice-web-presentation-utils-mock';

const listCurrencies =
    [
        {
            id: 1,
            literalISO: "RUB",
            digitalISO: "810",
            currencyName: "RUB"
        },
        {
            id: 2,
            literalISO: "USD",
            digitalISO: "840",
            currencyName: "USD"
        },
        {
            id: 3,
            literalISO: "EUR",
            digitalISO: "978",
            currencyName: "EUR"
        }
    ];

const listTemplates =
    [
        {
            type: "template-1",
            copiesNumber: 1,
            fileName: "Шаблон 1",

        },
        {
            type: "template-2",
            copiesNumber: 1,
            fileName: "Шаблон 2",
        },
        {
            type: "template-3",
            copiesNumber: 1,
            fileName: "Шаблон 3",
        }
    ];

const listInfo = {
    "totalElements": listCurrencies.length,
    "totalPages": 3,
    "last": true,
    "size": 10,
    "number": 0,
    "sort": null,
    "first": true,
    "numberOfElements": 3
};

const currencyService = new CRUDService(listCurrencies);

const createModuleMock = () => {

    const currencies = ({success}) => {
        success(
            {
                "content": currencyService.getRecords(),
                "totalElements": listInfo.totalElements,
                "totalPages": listInfo.totalPages,
                "last": true,
                "size": listInfo.size,
                "number": listInfo.number,
                "sort": listInfo.sort,
                "first":true,
                "numberOfElements": listInfo.numberOfElements
            })
    };


    return [
        mockRoute.get('/dictionaries/currencies', currencies)
    ]
};
export default createModuleMock