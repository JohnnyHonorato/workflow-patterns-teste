var LoginPage = require('../page-objects/login.po.js');
var TaskPage = require('../page-objects/task.po.js');

describe('Homepage', function () {

    var loginPage = new LoginPage;
    var taskPage = new TaskPage;
    const numeroTrTable = 1;
    const idTr = '//*[@id="table"]/tbody/tr[' + numeroTrTable + ']/td[1]';
    var msgAceita = 'Item updated.\nClose';
    var msgNegado = 'Erro ao trocar o estado\nClose';

    beforeAll(function () {
        loginPage.visit();
        loginPage.fillForm('admin', 'master');
        taskPage.visit();
        taskPage.cadastro('initial');
        loginPage.sair();
    });

    afterAll(function () {

    });

    function clickButton(action) {
        element(by.xpath(idTr)).getText().then(function (id) {
            idButton = "button-" + action + "-" + id;
            element(by.id(idButton)).click();
        });
    }

    function getToastErrorMessage() {
        return element(by.className('mat-simple-snackbar')).getText();
    }

    function testeAbstrato(nome, senha, botao, msg){
        loginPage.fillForm(nome, senha);
        taskPage.visit();
        clickButton(botao);
        browser.sleep(2500);
        expect(getToastErrorMessage()).toEqual(msg);
        browser.sleep(6000); 
        loginPage.sair();
    }

    it('Sue tenta abrir arquivo e é aceito', () => {
        testeAbstrato('sue', 'master', 'openOffice', msgAceita);     
    });

    it('Sue tenta fazer deposito e é negado', () => {
        testeAbstrato('sue', 'master', 'doBanking', msgNegado);
    });

    it('Sue tenta fechar arquivo e é negado', () => {
        testeAbstrato('sue', 'master', 'closeOffice', msgNegado);
    });

    it('Bob tenta abrir arquivo depois que sue abre e é negado', () => {
        testeAbstrato('bob', 'master', 'openOffice', msgNegado); 
    });

    it('Bob tenta fazer deposito depois que sue abre e é aceito', () => {
        testeAbstrato('bob', 'master', 'doBanking', msgAceita);
    });

    it('Bob tenta fechar arquivo depois que sue abre e é negado', () => {
        testeAbstrato('bob', 'master', 'closeOffice', msgNegado); 
    });

    it('Sue tenta abrir arquivo depois que ele foi aberto e foi feito o deposito e é negado', () => {
        testeAbstrato('sue', 'master', 'openOffice', msgNegado);     
    });

    it('Sue tenta fazer deposito depois que ele foi aberto e foi feito o deposito e é negado', () => {
        testeAbstrato('sue', 'master', 'doBanking', msgNegado);
    });

    it('Sue tenta fechar arquivo depois que ele foi aberto e foi feito o deposito e é aceito', () => {
        testeAbstrato('sue', 'master', 'closeOffice', msgAceita);
    });

});