var LoginPage = function () {
    this.loginField = element(by.css("input[formControlName=login]"));
    this.senhaField = element(by.css("input[formControlName=password]"));
    this.submitButton = element(by.css('app-loading-button button'));
};

LoginPage.prototype.fillForm = function (login, senha) {
    this.loginField.sendKeys(login);
    this.senhaField.sendKeys(senha);
    this.submitButton.click();
};

LoginPage.prototype.visit = function () {
    browser.get('#/login');
};

LoginPage.prototype.sair = function () {
    element(by.xpath('/html/body/app-root/app-home/div/mat-toolbar/app-header/button')).click();
    element(by.id('exit')).click();
};

module.exports = LoginPage;