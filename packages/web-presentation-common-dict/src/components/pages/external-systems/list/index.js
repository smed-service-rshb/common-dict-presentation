import ExternalSystems from './external-systems-list'
import {Rights} from '@efr/medservice-web-presentation-authentication'

export const ExternalSystemsListPage = {
    key: 'external-systems-list',
    path: '/external-systems',
    component: ExternalSystems,

	availability: authContext => authContext.checkPermission(Rights.EDIT_SYSTEM_DICTIONARIES)
};
