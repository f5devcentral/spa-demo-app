import Jasmine from 'jasmine';
import JasmineConsoleReporter from 'jasmine-console-reporter';
const jasmine = new Jasmine();
var reporter = new JasmineConsoleReporter({
        colors: 1,
        cleanStack: 3,
        verbosity: 4,
        listStyle: 'indent',
        activity: false
});
jasmine.addReporter(reporter);
jasmine.showColors(true);
jasmine.loadConfigFile('spec/jasmine.json');
jasmine.execute();
