import CashSymbols from './CashSymbolsPage'
import {Rights} from '@efr/medservice-web-presentation-authentication'

export const CashSymbolsPage = {
    key: "cash-symbols-test-page",
    path: '/cash-symbols-test-page',
    component: CashSymbols,

    availability: authContext => authContext.checkPermission(Rights.VIEW_BUSINESS_DICTIONARIES)
        || authContext.checkPermission(Rights.EDIT_BUSINESS_DICTIONARIES)
};
