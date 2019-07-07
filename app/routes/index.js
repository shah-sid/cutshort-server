const app = module.exports = require('express')();

import { authenticate } from './../middlewares/authentication';
/** Respond true if OPTIONS request */
function optionCheck(req, res, next) {
	if (req.method == 'OPTIONS') {
		res.status(200).send({ success: true });
	} else next();
}

/** Unverified requests  */
app.use('/api', optionCheck);
app.use('/api/auth', require('./auth'));

/** Authorized requests */
app.all('/api/account*', authenticate);
app.use('/api/account', require('./account'));