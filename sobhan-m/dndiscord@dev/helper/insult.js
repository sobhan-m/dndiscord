const https = require('https');

module.exports = async () => {
	return new Promise((resolve, reject) => {
		https.get('https://evilinsult.com/generate_insult.php?lang=en&type=json', (resp) => {
		let data = '';

		resp.on('data', (chunk) => {
			data += chunk;
		});

		// The whole response has been received. Print out the result.
		resp.on('end', () => {
			let insult = JSON.parse(data).insult;
			console.log(`helper.getInsult(): ${insult}`);
			resolve(insult);
		});

		}).on("error", (err) => {
			reject(err);
		});
	})
}



// https://evilinsult.com/generate_insult.php?lang=en&type=json