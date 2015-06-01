var assert = require('assert');
var github = require('octonode');
var client = github.client();
var ghrepo = client.repo('joyent/node');

ghrepo.commits(function (err, commits) {
	var lastAlpha = parseInt(commits[2].sha.substr(-1));
	var lightColor = !isNaN(lastAlpha) && typeof(lastAlpha) === 'number';
	

	assert.strictEqual(0 <= lastAlpha && lastAlpha <= 9, lightColor);
});
