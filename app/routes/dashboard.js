const app = module.exports = require('express')();
const { findAll, find, create, edit, deleteDashboard, updatePosition } = require('./../actions/dashboard');

app.get('/', (req, res) => {
	findAll(req.user.id)
		.then((data) => res.send({ success: true, data }))
		.catch((error) => res.send({ success: false, error }))
});

app.get('/:id', (req, res) => {
	find(req.user.id, req.params.id)
		.then((data) => res.send({ success: true, data }))
		.catch((error) => res.send({ success: false, error }))
});

app.post('/', (req, res) => {
	create(req.user.id, req.body.dashboardID, req.body.type, req.body.description, req.body.tags)
		.then((data) => res.send({ success: true, data }))
		.catch((error) => res.send({ success: false, error }))
});

app.put('/', (req, res) => {
	edit(req.user.id, req.body.dashboardID, req.body.type, req.body.description, req.body.tags)
		.then((data) => res.send({ success: true, data }))
		.catch((error) => res.send({ success: false, error }))
})

app.put('/updatePosition', (req, res) => {
	updatePosition(req.body.widgets)
		.then((data) => res.send({ success: true, data }))
		.catch((error) => res.send({ success: false, error }))
})

app.delete('/:id', (req, res) => {
	deleteDashboard(req.user.id, req.params.id)
		.then((data) => res.send({ success: true, data }))
		.catch((error) => res.send({ success: false, error }))
})
