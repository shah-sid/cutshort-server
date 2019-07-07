exports = module.exports = (app, mongoose) => {
	const ClientSchema = new mongoose.Schema({
		/** Object ID of logged in admin */
		userID: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
		/** Refresh token generated for regeneration of access_token after expiry */
		refresh_token: { type: String },
		fcmToken: { type: String, default: '' },
		/** 0 indicates client is still logged in, change to 1 when logged out and update endedAt session time */
		flag: { type: Number, default: 0 },
		endedAt: { type: Date, default: Date.now },

		/** User Information */
		createdAt: { type: Date, default: Date.now },
		userAgent: { type: String, default: '' },
		device: { type: String, default: '' }
	}, {
		minimize: false,
		strictQuery: true,
		timestamps: {
			createdAt: 'createdAt'
		}
	});

	app.db.model('Client', ClientSchema);
};