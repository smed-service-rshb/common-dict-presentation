import DivisionCodesPage from './division-code-create'
import {Rights} from '@efr/medservice-web-presentation-authentication'

export const DivisionCodeCreatePage = {
    key: 'division-code-create',
    path: '/division-codes/',
    component: DivisionCodesPage,

	availability: authContext => authContext.checkPermission(Rights.EDIT_BUSINESS_DICTIONARIES)
};
