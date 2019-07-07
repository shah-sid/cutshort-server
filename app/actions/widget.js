const find = async (dashboardID) => {
	let db = require('./../app').default.db;
	let WIDGET = db.models.Widget;
	try {
		let widget = await WIDGET.find({ dashboardID });

		return widget;
	} catch (err) {
		return Promise.reject(err);
	}
}

const findWidgetConfig = async (_id) => {
	let db = require('./../app').default.db;
	let WIDGET = db.models.Widget;
	try {
		let widget = await WIDGET.findOne({ _id });

		return widget.config;
	} catch (err) {
		return Promise.reject(err);
	}
}

const create = async (userID, dashboardID, widgetTypeID, config) => {
	let db = require('./../app').default.db;
	let WIDGET = db.models.Widget;
	let WIDGETTYPE = db.models.WidgetType;
	let DASHBOARD = db.models.Dashboard;
	try {

		let dashboard = await DASHBOARD.findOne({ userID, _id: dashboardID });

		if (!dashboard)
			return Promise.reject('Dashboard not found');

		let widgetType = await WIDGETTYPE.findOne({ type: widgetTypeID });

		if (!widgetType)
			return Promise.reject('Widget type not found');

		let widget = new WIDGET({
			title: widgetType.title,
			type: widgetType.type,
			description: widgetType.description,
			config,
			dashboardID,
			widgetTypeID: widgetType._id,
		});

		await widget.save();
		return widget;
	} catch (err) {
		return Promise.reject(err);
	}
}

const edit = async (userID, id, config) => {
	console.log(id, config);
	let db = require('./../app').default.db;
	let WIDGET = db.models.Widget;
	let DASHBOARD = db.models.Dashboard;
	try {
		let widget = await WIDGET.findOne({ _id: id });

		if (!widget)
			return Promise.reject('Widget not found');

		let dashboard = await DASHBOARD.findOne({ userID, _id: widget.dashboardID });

		if (!dashboard)
			return Promise.reject('Dashboard not found');

		widget.config = config;
		await widget.save();

		return widget;
	} catch (err) {
		return Promise.reject(err);
	}
}

const deleteWidget = async (userID, widgetID) => {
	const db = require('./../app').default.db;
	const WIDGET = db.models.Widget;
	const DASHBOARD = db.models.Dashboard;
	try {

		let widget = await WIDGET.findOne({ _id: widgetID });

		let dashboard = await DASHBOARD.findOne({ userID, _id: widget.dashboardID });

		if (!dashboard)
			return Promise.reject('Dashboard not found');

		let removeWidget = await widget.remove();

		return removeWidget;
	} catch (err) {
		return Promise.reject(err);
	}
}

module.exports = { find, create, edit, deleteWidget, findWidgetConfig };
