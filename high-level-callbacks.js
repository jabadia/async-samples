const fs = require('fs');

// --- first version

function main0(packageName) {
	fs.readFile('package.json', 'utf8', function(err, data) {
		console.log(data);
		const json = JSON.parse(data);
		if (json.dependencies && json.dependencies[packageName]) {
			const packageVersion = json.dependencies[packageName];
			console.log(`[0] ${packageName} version is ${packageVersion}`);
		} else {
			console.error('ups!', new Error(`[0] ${packageName} not found in dependencies`));
		}
	});
}

// --- second version, bad

function main1(packageName) {
	function getPackageVersion__bad(packageName) {
		fs.readFile('package.json', 'utf8', function(err, data) {
			// return data; // to whom?
			const json = JSON.parse(data);
			if (json.dependencies && json.dependencies[packageName]) {
				const packageVersion = json.dependencies[packageName];
				return packageVersion; // to whom?
			} else {
				throw new Error(`[1] ${packageName} not found in dependencies`); // who catches this?
				// NEVER throw inside async callback
			}
		});
	}

	try {
		const version = getPackageVersion__bad(packageName);
		console.log(`[1] ${packageName} version is ${version}`);
	} catch (err) {
		console.error('ups!', err);
	}
}

// --- third version, correct

function main2(packageName) {
	function getPackageVersion(packageName, cb) {
		fs.readFile('package.json', 'utf8', function(err, data) {
			// return data; // to whom?
			const json = JSON.parse(data);
			if (json.dependencies && json.dependencies[packageName]) {
				const packageVersion = json.dependencies[packageName];
				return cb(null, packageVersion); // best practice, always return callbacks to ensure it's the last thing we do in the function
			} else {
				return cb(new Error(`[2] ${packageName} not found in dependencies`), null);
			}
		});
	}

	getPackageVersion(packageName, (err, version) => {
		if (err) {
			console.error('ups!', err);
		} else {
			console.log(`[2] ${packageName} version is ${version}`);
		}
	});
}

try {
	packageName = 'axios';
	setTimeout(() => main0(packageName), 0);
	setTimeout(() => main1(packageName), 1000);
	setTimeout(() => main2(packageName), 2000);
} catch (err) {
	console.error('here!', err);
}
