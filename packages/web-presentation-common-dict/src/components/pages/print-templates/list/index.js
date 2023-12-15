import {Rights} from '@efr/medservice-web-presentation-authentication'
import PrintTemplatesList from './print-templates-list'

export const PrintTemplatesListPage = {
    key: 'print-templates-list',
    path: '/print-templates',
    component: PrintTemplatesList,

    availability: authContext => authContext.checkPermission(Rights.VIEW_BUSINESS_DICTIONARIES)
};
