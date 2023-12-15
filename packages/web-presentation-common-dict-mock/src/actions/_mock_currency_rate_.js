import {CRUDService, mockRoute} from '@efr/medservice-web-presentation-utils-mock';

const listRates =
    [
        {
            id: 1,
            currencyId: 1,
            currencyIso: "RUR",
            startDate: "13.02.2019 10:34:12",
            endDate: "13.02.2019 10:34:12",
            rate: 46.8,
            innerRate: 13.5,
            edited: true,
        },
        {
            id: 2,
            currencyId: 1,
            currencyIso: "RUR",
            startDate: "13.02.2019 10:34:12",
            endDate: "13.02.2019 10:34:12",
            rate: 46.8,
            innerRate: 13.5,
            edited: false,
        },
        {
            id: 3,
            currencyId: 2,
            currencyIso: "USD",
            startDate: "13.02.2019 10:34:12",
            endDate: "13.02.2019 10:34:12",
            rate: 46.8,
            innerRate: 13.5,
            edited: false,
        },
        {
            id: 4,
            currencyId: 1,
            currencyIso: "RUR",
            startDate: "13.02.2019 10:34:12",
            endDate: "13.02.2019 10:34:12",
            rate: 46.8,
            innerRate: 13.5,
            edited: false,
        },
        {
            id: 5,
            currencyId: 1,
            currencyIso: "RUR",
            startDate: "13.02.2019 10:34:12",
            endDate: "13.02.2019 10:34:12",
            rate: 46.8,
            innerRate: 13.5,
            edited: false,
        }
    ];

const listInfo = {
    "totalElements": listRates.length,
    "totalPages": 1,
    "last": true,
    "size": 50,
    "number": 0,
    "sort": null,
    "first": true,
    "numberOfElements": 5
};

const listService = new CRUDService(listRates);

const createModuleMock = () => {

    const currencyRates = ({success}) => {
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

    const getRate = ({success, request, error}) => {

        if (parseInt(request.params.id, 10) === 5) {
            error(404);
        } else {
            let rate = listService.getRecord(request.params.id);
            rate && success(rate);
            !rate && error(404);
        }
    };
    const saveRate = ({success, request, error}) => {

        if (parseInt(request.params.id, 10) === 5) {
            error(404);
        } else {
            let rate = listService.getRecord(request.params.id);
            rate && success(rate);
            !rate && error(404);
        }
    };
    const settings = ({success, request, error}) => {

        success({
            calculationType: 'CB_RF_RATE',
            additionalPercent: 2.0
        });


    };

    const currencyActiveRate =({request, success, error}) => {
        let rs = {};
        switch (request.query.currencyId+'') {
            case '1':
                rs.rate = 1.0;
                rs.innerRate = 1.0;
                break;
            case '2':
                rs.rate = 66.5022;
                rs.innerRate = 66.5022;
                break;
            case '3':
                rs.rate = 75.6197;
                rs.innerRate = 75.6197;
                break;
            default:
                error(404)
        }
        success(rs);
    };

    return [
        mockRoute.get('/dictionaries/rates', currencyRates),
        mockRoute.get('/dictionaries/rate/:id', getRate),
        mockRoute.put('/dictionaries/rate/:id', saveRate),
        mockRoute.get('/dictionaries/rates/setting', settings),
        mockRoute.get('/dictionaries/currency/rate/active', currencyActiveRate),
    ]
};
export default createModuleMock