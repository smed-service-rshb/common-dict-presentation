import {CRUDService, mockRoute} from '@efr/medservice-web-presentation-utils-mock';

const listBanks =
    [
        {
            id:1,
            name:"РФ АО \"РОССЕЛЬХОЗБАНК\" - \"ЦКБ\"",
            shortName:"РОССЕЛЬХОЗБАНК",
            bic:"044525720",
            swift:"12345678910",
            description:"Филиал банка",
            corrAccount:"30101810645250000720",
            address:"Москва",
            changedByHand:false,
            resident:true,
            deleted:false
        },
        {
            id:2,
            name:"Банк имени Емельки Пугачева №2",
            shortName:"Банк №2",
            bic:"222222222",
            swift:"2",
            description:"Банк на Урале",
            corrAccount:"0987654321",
            address:"Казань",
            changedByHand:false,
            resident:true,
            deleted:false
        },
        {
            id:3,
            name:"Банк имени Ивана Болотникова №3",
            shortName:"Банк №3",
            bic:"333333333",
            swift:"3",
            description:"Банк под Москвой",
            corrAccount:"6789012345",
            address:"Москва",
            changedByHand:false,
            resident:true,
            deleted:false
        },
        {
            id:4,
            name:"Банк имени Нестора Махно №4",
            shortName:"Банк №4",
            bic:"444444444",
            swift:"4",
            description:"Банк в Гуляй-Поле",
            corrAccount:"1234509876",
            address:"Екатеринослав",
            changedByHand:false,
            resident:true,
            deleted:false
        },
        {
            id:5,
            name:"Банк имени сера Френсиса Дрейка №5",
            shortName:"Банк №5",
            bic:"555555555",
            swift:"5",
            description:"Банк в Лондоне",
            corrAccount:"555555555",
            address:"Лондон",
            changedByHand:false,
            resident:true,
            deleted:false
        }
    ];

const listInfo = {
    "totalElements": listBanks.length,
    "totalPages": 1,
    "last": true,
    "size": 50,
    "number": 0,
    "sort": null,
    "first": true,
    "numberOfElements": 5
};

const listService = new CRUDService(listBanks);

const createModuleMock = () => {

    const banks = ({success}) => {
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

    const viewBank = ({success, request, error}) => {

        if (parseInt(request.params.id, 10) === 5) {
            error(404);
        } else {
            let bank = listService.getRecord(request.params.id);
            bank && success(bank);
            !bank && error(404);
        }
    };

    return [
        mockRoute.get('/dictionaries/banks', banks),
        mockRoute.get('/dictionaries/banks/:id', viewBank)
    ]
};
export default createModuleMock