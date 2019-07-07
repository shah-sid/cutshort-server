
exports = module.exports = (app, mongoose) => {
	const UserSchema = new mongoose.Schema({
		firstName: {
			type: String
		},
		lastName: {
			type: String
		},
		email: {
			type: String
		},
		password: {
			type: String
		},
		mobile: {
			type: String
		},
		status: {
			type: Number
		}
	});
	app.db.model('User', UserSchema);
};
