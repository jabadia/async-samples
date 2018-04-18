const axios = require('axios');

function getCategories() {
	return axios.get('http://api.icndb.com/categories').then(response => {
		const data = response.data;
		return data.value;
	});
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

function main() {
	getCategories()
		.then(pickRandom)
		.then(getJoke)
		.then(joke => {
			console.log(joke.joke);
		});
}

main();
