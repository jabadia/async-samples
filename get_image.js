var fs = require('fs'),
	request = require('request');

var download = function(uri, filename, callback) {
	request.head(uri, function(err, res, body) {
		console.log('content-type:', res.headers['content-type']);
		console.log('content-length:', res.headers['content-length']);

		request(uri)
			.pipe(fs.createWriteStream(filename))
			.on('close', callback);
	});
};

url = 'http://1.bp.blogspot.com/-pGJESK_kbYY/UZz3B8YQAnI/AAAAAAAA3J4/VGKfj0I-a34/s1600/David+Hasselhoff.jpg';
path = 'david.jpg';
download(url, path, function() {
	console.log('done');
});

console.log('end of file');

// http://bluebirdjs.com/docs/api/promise.promisify.html
