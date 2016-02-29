var casper = require('casper').create();

if(!(casper.cli.has(0) && casper.cli.has(1)))
{
    console.log("missing credentials! usage: casperjs jira-screen.js login password");
    this.exit();
}

casper.options.viewportSize = {width: 1920, height: 1600};
username = casper.cli.get(0)
password = casper.cli.get(1)

casper.start('https://monterail.atlassian.net/secure/RapidBoard.jspa?rapidView=134&view=reporting&chart=controlChart&days=14', function() {
    this.fillSelectors('form#form-crowd-login', {
        '#username': username,
        '#password': password
    }, false);
});

casper.thenEvaluate(function() {
    document.querySelector('form#form-crowd-login').submit();
});

casper.wait(3000, function() {
     casper.captureSelector('control-chart.png', "#ghx-chart-group");
});

casper.run(function() {
    this.echo('chart captured').exit();
});
