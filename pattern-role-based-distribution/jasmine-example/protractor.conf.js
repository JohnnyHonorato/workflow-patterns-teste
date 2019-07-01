let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

module.exports.config = {
    directConnect: true,
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        'browserName': 'firefox'
    },
    specs: ['specs/*.spec.js'],
    baseUrl: 'http://localhost:4200/',

    onPrepare: function(){
        jasmine.getEnv().addReporter(new SpecReporter({
          displayFailuresSummary: true,
          displayFailuredSpec: true,
          displaySuiteNumber: true,
          displaySpecDuration: true
        }));
      }
};