import { transactionWithRetry } from '../utils/retry';

const findAll = async () => {
	let db = require('../app').default.db;
	let WIDGETTYPE = db.models.WidgetType;
	try {
		let widget = await WIDGETTYPE.find();

		return widget;
	} catch (err) {
		return Promise.reject(err);
	}
}

const find = async (_id) => {
	let db = require('../app').default.db;
	let WIDGETTYPE = db.models.WidgetType;
	try {
		let widget = await WIDGETTYPE.findOne({ _id });

		if (!widget)
			return Promise.reject('Widget not found');

		return widget;
	} catch (err) {
		return Promise.reject(err);
	}
}

const create = async (title, type, description,config) => {
	console.log(title,type,description);
	let db = require('../app').default.db;
	let WIDGETTYPE = db.models.WidgetType;
	try {
		let widgetType = new WIDGETTYPE({
			title,
			type,
			description,
			config: config
		});
		await widgetType.save();
		return widgetType;
	} catch (err) {
		return Promise.reject(err);
	}
}

const edit = async (_id, title, type, description,config) => {
	let db = require('../app').default.db;
	let WIDGETTYPE = db.models.WidgetType;
	try {
		let widgetType = await WIDGETTYPE.findOne({ _id });

		if (!widgetType)
			return Promise.reject('widgetType not found');

		widgetType.title = title;
		widgetType.type = type;
		widgetType.description = description;
		widgetType.config = config;

		await widgetType.save();

		return widgetType;
	} catch (err) {
		return Promise.reject(err);
	}
}

const deleteWidgetType = async (_id) => {
	const db = require('../app').default.db;
	const WIDGETTYPE = db.models.WidgetType;
	const WIDGET = db.models.Widget;
	const session = await db.startSession();

	try {
		session.startTransaction(); // Start Transaction
		const opts = { session, new: true };

		let widgetType = await WIDGETTYPE.findOne({ _id });

		if (!widgetType)
			return Promise.reject('widgetType not found');

		let widgets = await WIDGET.find({ widgetTypeID: _id });

		let promiseArray = [];

		widgets.forEach(element => {
			promiseArray.push(element.remove(opts));
		});
		let deleteWidgetType = widgetType.remove(opts);
		promiseArray.push(deleteWidgetType);

		await Promise.all(promiseArray).catch(err => Promise.reject(err));

		await session.commitTransaction();
		session.endSession();

		return deleteWidgetType;
	} catch (err) {
		await session.abortTransaction();
		session.endSession();
		try {
			if (err.errorLabels && err.errorLabels[0] == 'TransientTransactionError') {
				let data = await transactionWithRetry(0, 5, deleteWidgetType(_id));
				return data;
			}
		} catch (err) {
			return Promise.reject(err);
		}
		return Promise.reject(err);
	}
}

module.exports = { findAll, find, create, edit, deleteWidgetType };
