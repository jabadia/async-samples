const dns = require('dns');
const Promise = require('bluebird');

var resolve4 = Promise.promisify(dns.resolve4);

const hosts = [
	// 'www.google.com',  // always wins
	'www.stylesage.co',
	'www.edited.com',
	'api.icndb.com',
];

let promises = hosts.map(host => {
	return resolve4(host).then(addresses => ({ host, ips: addresses }));
});

Promise.race(promises).then(winner => {
	console.log(winner);
});
