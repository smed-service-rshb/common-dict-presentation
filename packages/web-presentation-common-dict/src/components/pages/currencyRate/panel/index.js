import CurrencyRateView from './CurrencyRatePanel'
import {Rights} from '@efr/medservice-web-presentation-authentication'

export const CurrencyRatePage = {
    key: 'currency-rate-view',
    path: '/currency-rate/:id?',
    component: CurrencyRateView,

	availability: authContext => authContext.checkPermission(Rights.VIEW_BUSINESS_DICTIONARIES)
		|| authContext.checkPermission(Rights.EDIT_BUSINESS_DICTIONARIES)
};
