import DivisionCodePage from './division-code-view'
import {Rights} from '@efr/medservice-web-presentation-authentication'

export const DivisionCodeViewPage = {
    key: 'division-code-view',
    path: '/division-codes/:id',
    component: DivisionCodePage,

	availability: authContext => authContext.checkPermission(Rights.VIEW_BUSINESS_DICTIONARIES)
		|| authContext.checkPermission(Rights.EDIT_BUSINESS_DICTIONARIES)
};
