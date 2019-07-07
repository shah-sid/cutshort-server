exports = module.exports = (app, mongoose) => {
	const DashboardSchema = new mongoose.Schema({
		dashboardID: {
			type: String
		},
		type: {
			type: String
		},
		description : {
			type: String
		},
		userID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		tags: [{
			type: String
		}]
	});

	DashboardSchema.index({ 'dashboardID': 1, unique: true });
	app.db.model('Dashboard', DashboardSchema);
};
