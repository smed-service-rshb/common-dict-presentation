import ChannelsPage from './channels-list-page'
import {Rights} from '@efr/medservice-web-presentation-authentication'

export const ChannelsListPage = {
    key: 'channels-list-page',
    path: '/channels',
    component: ChannelsPage,

	availability: authContext => authContext.checkPermission(Rights.VIEW_BUSINESS_DICTIONARIES)
		|| authContext.checkPermission(Rights.EDIT_BUSINESS_DICTIONARIES)
};
