import {CRUDService, mockRoute} from '@efr/medservice-web-presentation-utils-mock';

const listCashSymbols = [
    {
        "id": 1,
        "code": 11,
        "name": "Поступления от реализации платных услуг (выполненных работ)",
        "operationType": "income",
        "purposeOfPayment": "Оплата по договору/ счету/ -фактуре/квитанции №"
    }, {
        "id": 2,
        "code": 12,
        "name": "Поступления налогов, сборов, страховых взносов, штрафов, таможенных платежей, средств самообложения граждан, взносов, страховых",
        "operationType": "income",
        "purposeOfPayment": "Оплата по договору/ счету/ -фактуре/квитанции №"
    }, {
        "id": 3,
        "code": 14,
        "name": "Поступления займов и в погашение кредитов",
        "operationType": "income",
        "purposeOfPayment": "Погашение задолженности по Кредитному договору №"
    }, {
        "id": 4,
        "code": 15,
        "name": "Поступления от операций с недвижимостью",
        "operationType": "income",
        "purposeOfPayment": "Внесение денежных средств на счет по договору №"
    }, {
        "id": 5,
        "code": 16,
        "name": "Поступления на счета по вкладам физических лиц",
        "operationType": "income",
        "purposeOfPayment": "Внесение денежных средств по договору вклада №"
    }, {
        "id": 6,
        "code": 31,
        "name": "Поступления на банковские счета физических лиц",
        "operationType": "income",
        "purposeOfPayment": "Внесение денежных средств на счет по договору №"
    }, {
        "id": 7,
        "code": 32,
        "name": "Прочие поступления",
        "operationType": "income",
        "purposeOfPayment": "Внесение денежных средств на счет по договору №"
    }, {
        "id": 8,
        "code": 51,
        "name": "Выдачи со счетов физических лиц",
        "operationType": "expenditure",
        "purposeOfPayment": "Выдача наличных денежных средств со счета по договору №"
    }, {
        "id": 9,
        "code": 54,
        "name": "Выдачи займов и кредитов",
        "operationType": "expenditure",
        "purposeOfPayment": "Выдача кредитных средств по Кредитному договору №"
    }, {
        "id": 10,
        "code": 55,
        "name": "Выдачи со счетов по вкладам (депозитам) физических лиц",
        "operationType": "expenditure",
        "purposeOfPayment": "Выдача наличных денежных средств по договору вклада №"
    }
];

const listInfo = {
    "totalElements": listCashSymbols.length,
    "totalPages": 1,
    "last": true,
    "size": 50,
    "number": 0,
    "sort": null,
    "first": true,
    "numberOfElements": 10
};

const listService = new CRUDService(listCashSymbols);

const cashSymbolsModuleMock = () => {

    const cashSymbols = ({success, error, request}) => {
        const items = listService.getRecords();
        if(request.query.code) {
            let item;
            items.forEach(e => {
                if(String(e.code) === String(request.query.code))
                    item = e;
            });
            item && success(item);
            !item && error(404);
            return;
        }
        success(
            {
                "content": items,
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

    const viewCashSymbol = ({success, request, error}) => {
        const item = listService.getRecord(request.params.id);

        item && success(item);
        !item && error(404);
    };

    return [
        mockRoute.get('/dictionaries/cash-symbols', cashSymbols),
        mockRoute.get('/dictionaries/cash-symbols/:id', viewCashSymbol)
    ]
};
export default cashSymbolsModuleMock