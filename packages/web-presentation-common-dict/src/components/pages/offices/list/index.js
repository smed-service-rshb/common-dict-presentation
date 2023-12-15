import OfficeDictionaryComponent from './offices-list-page'
import {Rights} from '@efr/medservice-web-presentation-authentication'

export const OfficesListPage = {
	key: 'office-list',
	path: '/offices',
	component: OfficeDictionaryComponent,

	availability: authContext => authContext.checkPermission(Rights.VIEW_BUSINESS_DICTIONARIES)
};
