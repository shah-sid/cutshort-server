import crypto from 'crypto';

/**
 * Creates Client document for maitaining session of admin before login
 * @param {Object} admin Admin Document
 * @param {String} userAgent User-agent from request object
 * @param {String} device 
 * @param {String} fcmToken 
 */
function addClient(user, userAgent) {
	return new Promise((resolve, reject) => {
		const refresh_token = crypto.randomBytes(10).toString('hex') + '.' + crypto.randomBytes(40).toString('hex');
		const Client = require('./../app').default.db.models.Client;
		const fieldsToSet = new Client({
			userID: user.id,
			refresh_token,
			userAgent
		});
		fieldsToSet.save()
			.then(() => resolve({ user, refresh_token }))
			.then(reject);
	});
}

/**
 * Sets flag as 0 in Client collection to mark as session end
 * @param {MongooseObjectId} userID 
 * @param {String} refresh_token 
 */
function setFlag(userID, refresh_token) {
	return new Promise((resolve, reject) => {
		const Client = require('./../app').default.db.models.Client;
		Client.update({ userID, refresh_token, flag: 0 }, { $set: { flag: 1, endedAt: Date.now() } }, (error, updated) => {
			if (error)
				reject(error);
			else resolve(true);
		});
	});
}

module.exports = {
	addClient,
	setFlag
};