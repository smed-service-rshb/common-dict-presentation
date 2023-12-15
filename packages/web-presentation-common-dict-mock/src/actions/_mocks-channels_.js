import {CRUDService, mockRoute} from '@efr/medservice-web-presentation-utils-mock';

const channelData =
    [
        {"id":1,"shortName":"office","fullName":"Отделение банка"},
        {"id":2,"shortName":"site","fullName":"Сайт банка"},
        {"id":3,"shortName":"ikfl","fullName":"ИКФЛ"},
        {"id":4,"shortName":"callcenter","fullName":"Колл-центр"},
        {"id":5,"shortName":"atm","fullName":"Банкомат"},
        {"id":6,"shortName":"telemark","fullName":"Телемаркетинг"},
        {"id":7,"shortName":"MB","fullName":"Мобильный банк"}
    ];

const channelService = new CRUDService(channelData);

const createModuleMock = () => {

    const CHANNELS = ({success}) => {
        success(
            {"content": channelService.getRecords()}
        )
    };

    const CHANNEL = ({success, request, error}) => {
        let channel = channelService.getRecord(request.params.id);

        channel && success(channel);
        !channel && error(404);
    };

    return [
        mockRoute.get('/dictionaries/channels/:id', CHANNEL),
        mockRoute.get('/dictionaries/channels', CHANNELS),
    ]
};
export default createModuleMock