var LoginPage = require('../page-objects/login.po.js');
var TaskPage = require('../page-objects/task.po.js');

describe('Homepage', function () {

    var loginPage = new LoginPage;
    var taskPage = new TaskPage;
    const numeroTrTable = 1;
    const idTr = '//*[@id="table"]/tbody/tr[' + numeroTrTable + ']/td[1]';
    const stateTr = '//*[@id="table"]/tbody/tr[' + numeroTrTable + ']/td[3]';

    beforeAll(function () {
        loginPage.visit();
        loginPage.fillForm('admin', 'master');
        taskPage.visit();
        taskPage.cadastro('initial');
    });

    afterAll(function () {
        taskPage.delete(numeroTrTable);
    });

    function compararActionState(action, state) {
        element(by.xpath(idTr)).getText().then(function (id) {
            idButton = "button-" + action + "-" + id;
            element(by.xpath(stateTr)).getText().then(function (stateAtual) {
                expect(stateAtual).toEqual(state);
                expect(element(by.id(idButton)).isPresent()).toBe(true);
            });
        });
    }

    function clickButton(action) {
        element(by.xpath(idTr)).getText().then(function (id) {
            idButton = "button-" + action + "-" + id;
            element(by.id(idButton)).click();
        });
    }

    function verificarButtonsAction(id, budget, approve, accomplish) {
        expect(element(by.id("button-openOffice-" + id)).isPresent()).toBe(budget);
        expect(element(by.id("button-doBanking-" + id)).isPresent()).toBe(approve);
        expect(element(by.id("button-closeOffice-" + id)).isPresent()).toBe(accomplish);
    }

    it('1 teste', () => {
        element(by.xpath(idTr)).getText().then(function (id) {
            verificarButtonsAction(id, true, false, false);
            compararActionState('openOffice', 'initial');
        });
    });

    it('2 teste', () => {
        clickButton("openOffice");
        element(by.xpath(idTr)).getText().then(function (id) {
            verificarButtonsAction(id, false, true, false);
            compararActionState('doBanking', 'open');
        });
    });

    it('3 teste', () => {
        clickButton("doBanking");
        element(by.xpath(idTr)).getText().then(function (id) {
            verificarButtonsAction(id, false, false, true);
            compararActionState('closeOffice', 'banker');
        });
    });

    it('4 teste', () => {
        clickButton("closeOffice");
        element(by.xpath(idTr)).getText().then(function (id) {
            element(by.xpath(stateTr)).getText().then(function (stateAtual) {
                expect(stateAtual).toEqual("closed");
                verificarButtonsAction(id, false, false, false);
            });
        });
    });
});