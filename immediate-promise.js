const axios = require('axios');

let cachedCategories = undefined;

function getCategories() {
	console.log('cachedCategories:', cachedCategories);
	if (cachedCategories) {
		// what should we return here?
		return cachedCategories;
		// return Promise.resolve(cachedCategories);
	} else {
		return axios.get('http://api.icndb.com/categories').then(response => {
			const data = response.data;
			cachedCategories = data.value;
			return data.value;
		});
	}
}

function getJoke(category) {
	const params = { limitTo: `[${category}]` };
	return axios.get('https://api.icndb.com/jokes/random', { params }).then(response => {
		return response.data.value;
	});
}

function pickRandom(items) {
	const randomItem = items[Math.floor(Math.random() * items.length)];
	return randomItem;
}

function showLog(msg) {
	return data => {
		console.log(msg, data);
		return data;
	};
}

function main() {
	getCategories()
		.then(showLog('# available categories:'))
		.then(pickRandom)
		.then(showLog('# requesting a joke of category:'))
		.then(getJoke)
		.then(joke => joke.joke)
		.then(showLog('the JOKE:'));
}

getCategories();
setTimeout(main, 1000);
