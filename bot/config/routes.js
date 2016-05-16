var path = require('path');
var kara = require('../karabot');
var github = require('../github/github');
var slashCommands = require('../github/githubSlashCommands');
var jiraController = require('../jira/jiraController');

function errorLogger(error, req, res, next) {
  // log the error then send it to the next middleware
  console.error(error.stack);
  next(error);
}

function errorHandler(error, req, res, next) {
  // send error message to client
  // message for gracefull error handling on app
  res.status(500).send({ error: error.message });
}

// frontend routes =========================================================
module.exports = function routes(app) {
  // Github
  app.post('/github', github.webHookReceiver);
  app.post('/repo', slashCommands.repo);
  app.post('/watch', slashCommands.watch);
  app.post('/unwatch', slashCommands.unwatch);

  // receive incoming POST requests from JIRA webhooks
  app.post('/', jiraController.handleJiraWebhooksIssues);

  // get highest priority JIRA issues on request
  app.get('/getHighestPriorityIssues', jiraController.getHighestPriorityIssues);

  // Error Logger/Handler
  app.use(errorLogger);
  app.use(errorHandler);
};
