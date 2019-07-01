var TaskPage = function(){ 
}

TaskPage.prototype.visit = function () {
    var submitButton = element(by.css('[ng-reflect-router-link="/tasks"]'));
    submitButton.click();
};

TaskPage.prototype.cadastro = function (state) {
    var submitButton = element(by.id('add-entity'));
    submitButton.click();
    element.all(by.className('mat-form-field-wrapper')).click();
    var opcao = "[ng-reflect-value=" + state + "]";
    element(by.css(opcao)).click();
    element(by.css('button[type = "submit"]')).click();
    browser.sleep(6000);
}

TaskPage.prototype.edit = function (state, id) {
    element(by.xpath('//*[@id="table"]/tbody/tr[' + id + ']/td[3]/button[4]')).click();
    element.all(by.className('mat-form-field-wrapper')).click();
    var opcao = "[ng-reflect-value=" + state + "]";
    element(by.css(opcao)).click();
    element(by.css('button[type = "submit"]')).click();
    browser.sleep(6000);
}

TaskPage.prototype.delete = function (id) {
    element(by.xpath('//*[@id="table"]/tbody/tr[' + id + ']/td[4]/button[3]')).click();
    element(by.id('ok')).click();
    browser.sleep(6000);
}

module.exports = TaskPage;