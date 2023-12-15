import {compose} from "@efr/medservice-web-presentation-core";
import {
    WithoutExternalDependency
} from "@efr/medservice-web-presentation-utils-dev";

import {Pages} from "@efr/medservice-web-presentation-common-dict";
import devDefinition from '@efr/medservice-web-presentation-common-dict/dependency';

import {TestPages} from './components';

const devAppModuleDefinition = arg => {
    const {page} = arg;

    Object.keys(TestPages).forEach(pageDescription => {
        page(TestPages[pageDescription]);
    });

    return arg;
};

export default compose(
    devAppModuleDefinition, // расширяем целевой модуль
    devDefinition({WithoutExternalDependency}), //dev-определение модуля (с указанием зависимостей)
);

export {TestPages, Pages};