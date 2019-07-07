const app = module.exports = require('express')();
import { login, signup, generateAuthorizationToken } from './../actions/auth';
import { addClient } from './../actions/client';
app.post('/signup', (req, res) => {
	signup({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password, mobile: req.body.mobile })
		.then(user => res.send({
			success: true,
			data: user
		}))
		.catch(error => res.send({
			success: false,
			errors: [error]
		}));
});

/** Regulator Login */
app.post('/login', (req, res) => {
	login(req.body.username, req.body.password)
		.then(admin => addClient(admin, req.headers['user-agent']))
		.then(admin => generateAuthorizationToken(JSON.parse(JSON.stringify(admin))))
		.then(data => {
			res.send({
				success: true,
				user: data.user,
				refresh_token: data.refresh_token,
				access_token: data.access_token,
				version: data.version
			});
		})
		.catch(error => {
			res.send({
				success: false,
				errors: [error]
			});
		});
});
