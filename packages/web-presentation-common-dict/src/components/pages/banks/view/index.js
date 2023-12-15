import BankView from './bank-view'
import {Rights} from '@efr/medservice-web-presentation-authentication'

export const BankViewPage = {
    key: 'bank_view',
    path: '/banks/:id',
    component: BankView,

	availability: authContext => authContext.checkPermission(Rights.VIEW_BUSINESS_DICTIONARIES)
		|| authContext.checkPermission(Rights.EDIT_BUSINESS_DICTIONARIES)
};
