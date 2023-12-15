import createAuthModuleMock from '@efr/medservice-web-presentation-authentication-mock'
import commonDictModuleMock from '@efr/medservice-web-presentation-common-dict-mock'

export default () => ({registerMock, externalMock}) => {
    //Конфигурируем и регистрируем заглушки внешних модулей
    externalMock(createAuthModuleMock());
    externalMock(commonDictModuleMock());
};
