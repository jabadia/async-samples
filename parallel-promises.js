const axios = require('axios');

let promises = [1, 2, 3, 4, 5, 6, 7, 8].map(jokeId => {
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
});

Promise.all(promises).then(values => {
	console.log(values);
});
