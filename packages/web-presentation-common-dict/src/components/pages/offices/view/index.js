import OfficeInfoComponent from './office-view'
import {Rights} from '@efr/medservice-web-presentation-authentication'

export const OfficeViewPage = {
	key: 'office_view',
	path: '/offices/:id',
	component: OfficeInfoComponent,

	availability: authContext => authContext.checkPermission(Rights.VIEW_BUSINESS_DICTIONARIES)
};
