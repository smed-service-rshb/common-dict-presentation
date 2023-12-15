import CurrencyRateList from './CurrencyRateList'
import {Rights} from '@efr/medservice-web-presentation-authentication'

export const CurrencyRateListPage = {
    key: 'currency-rate-list',
    path: '/currency-rates',
    component: CurrencyRateList,

    availability: authContext => authContext.checkPermission(Rights.VIEW_BUSINESS_DICTIONARIES)
        || authContext.checkPermission(Rights.EDIT_BUSINESS_DICTIONARIES)
};
