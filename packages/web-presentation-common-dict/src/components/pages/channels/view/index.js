import ChannelPage from './channel-view-page'
import {Rights} from '@efr/medservice-web-presentation-authentication'

export const ChannelViewPage = {
    key: 'channel-view-page',
    path: '/channels/:id',
    component: ChannelPage,

	availability: authContext => authContext.checkPermission(Rights.VIEW_BUSINESS_DICTIONARIES)
		|| authContext.checkPermission(Rights.EDIT_BUSINESS_DICTIONARIES)
};
