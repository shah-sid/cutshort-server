exports = module.exports = (app, mongoose) => {
	const WidgetSchema = new mongoose.Schema({
		title: {
			type: String
		},
		type: {
			type: String
		},
		description: {
			type: String
		},
		dashboardID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Dashboard'
		},
		widgetTypeID : {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'WidgetType'
		},
		config: {
			type: Object
		},
	});

	app.db.model('Widget', WidgetSchema);
};
