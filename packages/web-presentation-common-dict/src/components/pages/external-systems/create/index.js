import CreateExternalSystem from './external-system-create'
import {Rights} from '@efr/medservice-web-presentation-authentication'

export const ExternalSystemCreatePage = {
    key: 'external-system-create',
    path: '/external-systems/',
    component: CreateExternalSystem,

	availability: authContext => authContext.checkPermission(Rights.EDIT_SYSTEM_DICTIONARIES)
};
