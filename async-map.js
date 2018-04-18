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
            // return cb(new Error(`[2] ${packageName} not found in dependencies`), null);
            return cb(null, 'not found');
        }
    });
}

async.map(['axios', 'bluebird'], getPackageVersion, (err, results) => {
    if (err) console.log(err);
    console.log(results);
});

async.mapLimit(
    ['axios', 'bluebird', 'lodash', 'vue'],
    2,
    (item, cb) => getPackageVersion(item, cb),
    (err, results) => {
        if (err) console.log(err);
        console.log(results);
    }
);
