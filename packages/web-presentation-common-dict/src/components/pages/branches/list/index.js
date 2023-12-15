import BranchesPage from './branches-list-page'
import {Rights} from '@efr/medservice-web-presentation-authentication'

export const BranchesListPage = {
    key: 'branches-list-page',
    path: '/branches',
    component: BranchesPage,

	availability: authContext => authContext.checkPermission(Rights.VIEW_BUSINESS_DICTIONARIES)
		|| authContext.checkPermission(Rights.EDIT_BUSINESS_DICTIONARIES)
};
