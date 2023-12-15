import {Pages, Popups} from './components/index';
import * as Actions from './actions/index';
import * as Messages from './messages.json';

const moduleName = 'common-dict-app';

const moduleDefinition = arg => {
    const {name, action, page, modal} = arg;

    name(moduleName);

    Object.keys(Pages).forEach(pageDescription => {
        page(Pages[pageDescription]);
    });

    Object.keys(Popups).forEach(popupDescription => {
        modal(Popups[popupDescription]);
    });

    Object.keys(Actions).forEach(actionDescription => {
        action(Actions[actionDescription]);
    });

    return arg;
};

export default moduleDefinition;

export {moduleName}

export Permissions from './permissions';

export {Pages} from './components';
export {Popups} from './components';
export {Messages};