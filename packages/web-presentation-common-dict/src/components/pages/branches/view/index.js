import BranchPage from './branch-view-page'
import {Rights} from '@efr/medservice-web-presentation-authentication'

export const BranchViewPage = {
    key: 'branch-view-page',
    path: '/branches/:id',
    component: BranchPage,

	availability: authContext => authContext.checkPermission(Rights.VIEW_BUSINESS_DICTIONARIES)
		|| authContext.checkPermission(Rights.EDIT_BUSINESS_DICTIONARIES)
};
