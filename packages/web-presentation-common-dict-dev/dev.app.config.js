import AuthModuleDefinition from '@efr/medservice-web-presentation-authentication'

import devDefinition, {Pages} from './src';
import {TestPages} from "./src/components/pages";
import './style.css'

const navigation = menuItem => ([
    menuItem('Справочники', 'dictionaries').withChildren([

        menuItem(`Загрузка справочников для проверок`, 'uploads').toPage({
            key: Pages.UploadDictionariesPanel.key
        }),
        menuItem(`Справочник курсов валют`, 'rates').toPage({
            key: Pages.CurrencyRateListPage.key,
            related: [Pages.CurrencyRatePage.key]
        }),
        menuItem(`Филиалы`, 'filials').toPage({
            key: Pages.BranchesListPage.key,
            related: [Pages.BranchViewPage.key]
        }),
        menuItem(`Каналы`, 'channels').toPage({
            key: Pages.ChannelsListPage.key,
            related: [Pages.ChannelViewPage.key]
        }),
        menuItem(`Внешние системы`, 'external-system').toPage({
            key: Pages.ExternalSystemsListPage.key,
            related: [Pages.ExternalSystemCreatePage.key, Pages.ExternalSystemCreatePage.key]
        }),
        menuItem(`Офисы`, 'offices').toPage({
            key: Pages.OfficesListPage.key,
            related: [Pages.OfficeViewPage.key]
        }),
        menuItem(`Коды подразделений`, 'division-codes').toPage({
            key: Pages.DivisionCodesListPage.key,
            related: [Pages.DivisionCodeCreatePage.key, Pages.DivisionCodeViewPage.key]
        }),
        menuItem(`Банки`, 'banks').toPage({
            key: Pages.BanksListPage.key,
            related: [Pages.BankViewPage.key]
        }),
        menuItem(`Шаблоны печатных форм`, 'print-templates').toPage({
            key: Pages.PrintTemplatesListPage.key,
            related: [Pages.PrintTemplateEditPage.key]
        }),
    ]),
    menuItem(`[для тестирования] Всплывающие окна`, 'popups').toPage({
        key: TestPages.popupTestPage.key
    }),
    menuItem(`[для тестирования] Кассовые символы`, 'cash-symbols-test-page').toPage({
        key: TestPages.CashSymbolsPage.key
    })
]);

const modules = [
    devDefinition,
    AuthModuleDefinition
];

export default {
    navigation,
    modules,
}

