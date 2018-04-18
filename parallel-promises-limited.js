const Promise = require('bluebird');
const axios = require('axios');

function waitFor(seconds) {
	return data => {
		return new Promise((resolve, reject) => {
			console.log(`waiting for ${seconds} sec`);
			setTimeout(() => resolve(data), seconds * 1000);
		});
	};
}

let runningQueries = 0;

let promises = Promise.map(
	[1, 2, 3, 4, 5, 6, 7, 8, 14, 15, 16],
	jokeId => {
		runningQueries += 1;
		console.log(`fetching joke ${jokeId}, ${runningQueries} running queries`); // column chart
		return axios
			.get(`http://api.icndb.com/jokes/${jokeId}`)
			.then(response => {
				const data = response.data;
				if (data.type != 'success') {
					throw new Error(data.value);
				}
				return data;
			})
			.then(data => data.value)
			.then(joke => joke.joke)
			.then(waitFor(Math.floor(Math.random() * 5))) //
			.then(joke => {
				runningQueries -= 1;
				console.log(`finished processing ${jokeId}, ${runningQueries} running queries`);
				return joke;
			})
			.catch(reason => {
				runningQueries -= 1;
				console.log('ERROR:', reason.message);
				return reason.message;
			});
	},
	{ concurrency: 2 }
);

Promise.all(promises).then(values => {
	console.log(values);
	console.log('runningQueries:', runningQueries);
});
