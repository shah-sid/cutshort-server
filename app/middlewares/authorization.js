import jose from 'node-jose';
const keySet = require('./keyStore.js');

exports.createAuthenticationToken = (data) => {
	return new Promise((resolve, reject) => {
		jose.JWE.createEncrypt({ format: 'compact' }, keySet.JWKSet.keys[0])
			.update(JSON.stringify(data))
			.final()
			.then(encyptedKey => {
				// console.log('encypted :-', JSON.stringify(encyptedKey));
				resolve(encyptedKey);
			})
			.catch(error => {
				console.log('Error', error);
				reject(error);
			});
	});
};