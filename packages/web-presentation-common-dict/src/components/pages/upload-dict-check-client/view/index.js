import UploadDictComponent from './UploadDictComponent'
import {Rights} from '@efr/medservice-web-presentation-authentication'

export const UploadDictionariesPanel = {
	key: 'upload-client-check',
	path: '/dictionaries-upload',
	component: UploadDictComponent,

	availability: authContext => authContext.checkPermission(Rights.EDIT_PRODUCT_SETTINGS)
};
