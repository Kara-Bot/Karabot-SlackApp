var Botkit = require('botkit');
var unirest = require('unirest');

var controller = Botkit.slackbot({
  debug: true
});

function getHighestPriorityIssues(bot, message) {
  var issueMessages = [];
  unirest.get('http://localhost:5000/getHighestPriorityIssues', function (res) {
    console.log('RESPONSE', res.body)
    if (res.body.length > 0) {
      res.body.forEach(function (issue) {
        issueMessages.push('*' + issue.title + '*\n*Description*: ' +
          issue.summary + '\n' +
          issue.assignee + '\n' +
          issue.issueLink + '\n');
      });
      var botMessage = '*' + issueMessages.length +
        '* highest prioriy issue(s):\n\n' + issueMessages.join('--------------\n');
      bot.reply(message, botMessage);
    };
  });
}

module.exports = {
  getHighestPriorityIssues: getHighestPriorityIssues
};
