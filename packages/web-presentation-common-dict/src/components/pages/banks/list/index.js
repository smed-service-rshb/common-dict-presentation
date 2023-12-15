import Banks from './banks-list'
import {Rights} from '@efr/medservice-web-presentation-authentication'

export const BanksListPage = {
    key: 'banks-list',
    path: '/banks',
    component: Banks,

    availability: authContext => authContext.checkPermission(Rights.VIEW_BUSINESS_DICTIONARIES)
        || authContext.checkPermission(Rights.EDIT_BUSINESS_DICTIONARIES)
};
