import PopupTestPage from "./PopupTestPage";
import {Rights} from "@efr/medservice-web-presentation-authentication/src/index";

export const popupTestPage = {
    key: 'popup-test-page',
    path: '/popups',
    component: PopupTestPage,

    availability: authContext => authContext.checkPermission(Rights.VIEW_BUSINESS_DICTIONARIES)
	|| authContext.checkPermission(Rights.EDIT_BUSINESS_DICTIONARIES)
};
