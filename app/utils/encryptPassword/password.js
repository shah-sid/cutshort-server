import bcrypt from 'bcrypt';
const encryptPassword = async function (password) {
	try {
		const salt = await bcrypt.genSaltSync(10);
		const hash = await bcrypt.hashSync(password, salt);
		return await Promise.resolve(hash);
	} catch (err) {
		return Promise.reject(err);
	}
};

/** 
     * @param {String} password User entered password
     * @param {Encrypted} hash User encrypted password saved in db
     * @returns {Boolean} response = true/false
     */
const validatePassword = async (password, hash) => {
	try {
		let response = await bcrypt.compareSync(password, hash);
		return Promise.resolve(response);

	} catch (err) {
		return Promise.reject(err);
	}

};

module.exports = { encryptPassword, validatePassword };