const axios = require('axios');

// https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9

function getJoke(jokeId) {
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
		.catch(reason => {
			console.log('ERROR:', reason.message);
			return reason.message;
		});
}

const main = async () => {
	// console.log('start of main');
	const joke = await getJoke(5);
	console.log(joke);
	// console.log('end of main');
};

// console.log('before main');
const rv = main();
console.log('after main', rv);
