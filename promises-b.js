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

function main() {
	getCategories()
		.then(categories => {
			console.log(`# available categories: ${categories.join(', ')}`);
			const randomCategory = categories[Math.floor(Math.random() * categories.length)];
			console.log(`# requesting a ${randomCategory} joke`);
			return randomCategory;
		})
		.then(getJoke)
		.then(joke => {
			console.log(joke.joke);
		});
}

main();
