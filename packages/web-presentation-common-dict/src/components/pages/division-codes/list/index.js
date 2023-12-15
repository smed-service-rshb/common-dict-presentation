import DivisionCodesPage from './division-codes-list'
import {Rights} from '@efr/medservice-web-presentation-authentication'

export const DivisionCodesListPage = {
    key: 'division-codes-list',
    path: '/division-codes',
    component: DivisionCodesPage,

	availability: authContext => authContext.checkPermission(Rights.VIEW_BUSINESS_DICTIONARIES)
};
