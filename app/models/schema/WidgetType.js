exports = module.exports = (app, mongoose) => {
	const WidgetTypeSchema = new mongoose.Schema({
		title: {
			type: String
		},
		type: {
			type: String
		},
		description: {
			type: String
		},
		config: {
			type: Object
		}
	});

	WidgetTypeSchema.index('type', { unique: 1 });

	app.db.model('WidgetType', WidgetTypeSchema);
};
