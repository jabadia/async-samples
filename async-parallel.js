const async = require('async');
const fs = require('fs');

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

async.parallel([cb => getPackageVersion('axios', cb), cb => getPackageVersion('bluebird', cb)], function(
    err,
    results
) {
    console.log(results);
});
