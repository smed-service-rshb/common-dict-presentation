import ViewExternalSystem from './external-system-view'
import {Rights} from '@efr/medservice-web-presentation-authentication'

export const ExternalSystemViewPage = {
    key: 'external-system-view',
    path: '/external-systems/:id',
    component: ViewExternalSystem,

	availability: authContext => authContext.checkPermission(Rights.EDIT_SYSTEM_DICTIONARIES)
};
