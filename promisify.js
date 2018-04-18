const dns = require('dns');

// standard node callback style

dns.resolve4('www.google.com', function(err, addresses) {
	if (err) {
		console.error(err);
	}

	console.log(addresses);
});

// promisify

const Promise = require('bluebird');
var resolve4 = Promise.promisify(dns.resolve4);

resolve4('www.google.com')
	.then(addresses => {
		console.log(addresses);
	})
	.catch(err => {
		console.error(err);
	});
