import { validatePassword, encryptPassword } from './../utils/encryptPassword/password';
import { createAuthenticationToken } from '../middlewares/authorization';
const signup = async ({ firstName, lastName, email, password, mobile }) => {
	let db = require('./../app').default.db;
	let USER = db.models.User;
	try {
		let hash = await encryptPassword(password);
		let user = new USER({
			firstName,
			lastName,
			email,
			password: hash,
			mobile,
			status: 1
		});
		await user.save();
		return user;
	} catch (err) {
		console.log(err);
		return Promise.reject(err);
	}
};

/**
 * Creates Admin Object to send in login response
 * @param {Object} admin 
 */
const filterUser = (user) => {
	return {
		id: user._id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		mobile: user.mobile,
	};
};

/**
 * Creates authorization token using admin information
 * @param {Object} data Admin Object
 */
function generateAuthorizationToken(data) {
	return new Promise((resolve, reject) => {
		const dataToEncrypt = {
			id: data.user.id,
			email: data.user.email,
			firstName: data.user.firstName,
			lastName: data.user.lastName,
			mobile: data.user.mobile,
			refresh_token: data.refresh_token,
			sessionTime: Date.now() / 1000 | 0
		};
		createAuthenticationToken(dataToEncrypt)
			.then(authorizationToken => {
				console.log('Authorization Token:-', authorizationToken);
				resolve({
					user: data.user,
					refresh_token: data.refresh_token,
					access_token: authorizationToken
				});
			})
			.catch(error => {
				console.log('Error :-', error);
				reject(error);
			});
	});
}

const login = async (username, password) => {
	let db = require('./../app').default.db;
	let USER = db.models.User;
	try {
		let user = await USER.findOne({
			email: username,
		});
		if (!user)
			return Promise.reject('No user account found');

		if (!user.status)
			return Promise.reject('Account not active');
		console.log(password, user.password);
		const login = await validatePassword(password, user.password);
		if (!login)
			return Promise.reject('Invalid password');
		else
			return filterUser(user);

	} catch (err) {
		console.log(err);
		return Promise.reject(err);
	}
};

module.exports = {
	signup,
	login,
	filterUser,
	generateAuthorizationToken
};
