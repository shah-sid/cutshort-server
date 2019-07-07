import { JWKKeySet } from '../../config';
import jose from 'node-jose';

function verifyAuthorizationToken(token) {
	return new Promise((resolve, reject) => {
		try {
			jose.JWK.asKeyStore(JWKKeySet)
				.then(result => {
					jose.JWE.createDecrypt(result)
						.decrypt(token)
						.then(decodedToken => {
							resolve(JSON.parse(decodedToken.plaintext.toString()));
						})
						.catch(() => {
							reject('Invalid Authorization Bearer! Try Logging-in again!');
						});
				});
		} catch (error) {
			reject(error);
		}
	});
}

function authenticate(req, res, next) {
	if (req.method == 'OPTIONS')
		res.status(200).send();
	else if (req.headers && req.headers.authorization) {
		const currentTime = Date.now() / 1000 | 0;
		const authorizationToken = req.headers.authorization.split(' ')[1];
		verifyAuthorizationToken(authorizationToken)
			.then(decryptedToken => {
				if (currentTime - decryptedToken.sessionTime > 900000)
					res.status(401).send({ success: false, errors: ['authentication required'] });
				else {
					req.user = decryptedToken;
					next();
				}
			})
			.catch(error => res.status(401).send({ success: false, errors: [error] }));
	} else
		res.status(401).send({ success: false, errors: ['authentication required'] });
}

module.exports = {
	authenticate
};