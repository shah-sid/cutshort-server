exports = module.exports = (app, mongoose) => {
	/* eslint-disable global-require */
	require('./schema/Client')(app, mongoose);
	require('./schema/Dashboard')(app, mongoose);
	require('./schema/User')(app, mongoose);
	require('./schema/Widget')(app, mongoose);
	require('./schema/WidgetType')(app, mongoose);
	/* eslint-enable global-require */
};
