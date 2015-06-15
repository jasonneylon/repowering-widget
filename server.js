var express = require('express');
var app = express();

app.get('/*', function (req, res) {
	var project = {
		fund_raising_target: 142000,
		funds_raised: 50000,
		investors: 25,
		name: "Banister House"
	};
  res.jsonp(project);
});

var server = app.listen(3000, function () {

	var host = server.address().address;
	var port = server.address().port;

  console.log('Test jsonp server listening at http://%s:%s', host, port);
});