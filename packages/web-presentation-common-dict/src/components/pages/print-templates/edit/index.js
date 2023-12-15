import {Rights} from '@efr/medservice-web-presentation-authentication'
import PrintTemplate from './print-template-edit'

export const PrintTemplateEditPage = {
    key: 'print-templates-edit',
    path: '/print-templates/:type',
    component: PrintTemplate,

    availability: authContext => authContext.checkPermission(Rights.EDIT_BUSINESS_DICTIONARIES)
};