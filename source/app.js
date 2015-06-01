// express
var express = require('express');
var app = express();

// ect
var ect = require('ect')({
	watch: true,
	root: __dirname + '/views',
	ext: '.html'
});

// octonode
var github = require('octonode');

// constant
var PORT = 80;
var REPO = 'joyent/node';

// create ghrepo object
var client = github.client();
var ghrepo = client.repo(REPO);

// initialize app
app.engine('html', ect.render);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// middleware
app.use('/public', express.static(__dirname + '/public'));

// //
app.get('/', function (req, res) {
	ghrepo.commits(function (err, commits) {
		if (err) {
			console.log(err);
			return;
		}
		res.render('commits', {title: 'commits', commits: commits});
	});
});

// get author
app.get('/authors', function (req, res) {
	ghrepo.contributors(function (err, contributors) {
		if (err) {
			console.log(err);
			return;
		}
		res.render('contributors', {title: 'authors', contributors: contributors});
	});
});

app.get('*', function (req, res) {
	res.send('404');
})

app.listen(PORT);

console.log('server started at port 80');
