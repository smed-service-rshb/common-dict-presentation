import MockBanks from "./actions/_mock_banks";
import MockSearch from "./actions/_search_mock";
import MocksDivisionCodes from "./actions/_mocks-division-codes_";
import MocksChannels from "./actions/_mocks-channels_";
import MocksExternalSystems from "./actions/_mocks-external-systems";
import MocksBranches from "./actions/_mocks-branches_";
import MocksOffices from "./actions/_mocks-offices_";
import MocksCashSymbols from "./actions/cashSymbolsModuleMock";
import MocksUploadDict from "./actions/_dictinaries-upload";
import MocksCurrencyRate from "./actions/_mock_currency_rate_";
import MocksCurrency from "./actions/_mock_currency";


export default () => ({registerMock}) => {
    //Регистрируем собственные заглушки
    registerMock(MocksChannels());
    registerMock(MocksBranches());
    registerMock(MocksOffices());
    registerMock(MockSearch());
    registerMock(MocksExternalSystems());
    registerMock(MockBanks());
    registerMock(MocksDivisionCodes());
    registerMock(MocksCashSymbols());
    registerMock(MocksUploadDict());
    registerMock(MocksCurrencyRate());
    registerMock(MocksCurrency());
};