import { transactionWithRetry } from '../utils/retry';

const findAll = async (userID) => {
	let db = require('./../app').default.db;
	let DASHBOARD = db.models.Dashboard;
	try {
		let dashboards = await DASHBOARD.find({ userID });
		return dashboards;
	} catch (err) {
		return Promise.reject(err);
	}
}

const find = async (userID, dashboardID) => {
	let db = require('./../app').default.db;
	let DASHBOARD = db.models.Dashboard;
	try {
		let dashboard = await DASHBOARD.findOne({ userID, dashboardID });

		if (!dashboard)
			return Promise.reject('Dashboard not found');

		return dashboard;
	} catch (err) {
		return Promise.reject(err);
	}
}

const create = async (userID, dashboardID, type, description, tags) => {
	let db = require('./../app').default.db;
	let DASHBOARD = db.models.Dashboard;
	try {
		let dashboards = new DASHBOARD({
			userID,
			type,
			dashboardID,
			description,
			tags
		});
		await dashboards.save();
		return dashboards;
	} catch (err) {
		return Promise.reject(err.code === 11000 ? 'Dashboard ID already exists' : err);
	}
}

const edit = async (userID, dashboardID, type, description, tags) => {
	let db = require('./../app').default.db;
	let DASHBOARD = db.models.Dashboard;
	try {
		let dashboard = await DASHBOARD.findOne({ userID, dashboardID });

		if (!dashboard)
			return Promise.reject('Dashboard not found');

		dashboard.type = type;
		dashboard.description = description;
		dashboard.tags = tags;

		await dashboard.save();

		return dashboard;
	} catch (err) {
		return Promise.reject(err);
	}
}

const deleteDashboard = async (userID, dashboardID) => {
	const db = require('./../app').default.db;
	const DASHBOARD = db.models.Dashboard;
	const WIDGET = db.models.Widget;
	const session = await db.startSession();

	try {
		session.startTransaction(); // Start Transaction
		const opts = { session, new: true };

		let dashboard = await DASHBOARD.findOne({ userID, _id: dashboardID });

		if (!dashboard)
			return Promise.reject('Dashboard not found');

		let widgets = await WIDGET.find({ dashboardID });

		let promiseArray = [];

		widgets.forEach(element => {
			promiseArray.push(element.remove(opts));
		});
		let deleteDashboard = dashboard.remove(opts);
		promiseArray.push(deleteDashboard);

		await Promise.all(promiseArray).catch(err => Promise.reject(err));

		await session.commitTransaction();
		session.endSession();

		return dashboard;
	} catch (err) {
		await session.abortTransaction();
		session.endSession();
		try {
			if (err.errorLabels && err.errorLabels[0] == 'TransientTransactionError') {
				let data = await transactionWithRetry(0, 5, deleteDashboard(userID, dashboardID));
				return data;
			}
		} catch (err) {
			return Promise.reject(err);
		}
		return Promise.reject(err);
	}
}

const updatePosition = async (widgets) => {
	const db = require('./../app').default.db;
	const WIDGET = db.models.Widget;
	const session = await db.startSession();
	try {
		session.startTransaction();
		const opts = { session, new: true };
		let promiseArray = [];
		widgets.forEach(widget => {
			let task = WIDGET.findOneAndUpdate({ _id: widget.id }, { $set: { 'config.position.x': widget.position.x, 'config.position.y': widget.position.y } }, opts);
			promiseArray.push(task);
		});
		await Promise.all(promiseArray).catch(err => Promise.reject(err));
		await session.commitTransaction();
		session.endSession();

		return true;
	} catch (err) {
		await session.abortTransaction();
		session.endSession();
		try {
			if (err.errorLabels && err.errorLabels[0] == 'TransientTransactionError') {
				let data = await transactionWithRetry(0, 5, updatePosition(widgets));
				return data;
			}
		} catch (err) {
			return Promise.reject(err);
		}
		return Promise.reject(err);
	}
}

module.exports = { findAll, find, create, edit, deleteDashboard, updatePosition };
