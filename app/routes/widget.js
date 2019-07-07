const app = module.exports = require('express')();
const { find, findWidgetConfig, create, edit, deleteWidget } = require('../actions/widget');

app.get('/:id', (req, res) => {
	find(req.params.id)
		.then((data) => res.send({ success: true, data }))
		.catch((error) => res.send({ success: false, error }))
});

app.get('/config/:id', (req, res) => {
	findWidgetConfig(req.params.id)
		.then((data) => res.send({ success: true, data }))
		.catch((error) => res.send({ success: false, error }))
});

app.post('/', (req, res) => {
	create(req.user.id, req.body.dashboard, req.body.type, req.body.config)
		.then((data) => res.send({ success: true, data }))
		.catch((error) => res.send({ success: false, error }))
});

app.put('/', (req, res) => {
	edit(req.user.id, req.body._id, req.body.config)
		.then((data) => res.send({ success: true, data }))
		.catch((error) => res.send({ success: false, error }))
})

app.delete('/:id', (req, res) => {
	deleteWidget(req.user.id, req.params.id)
		.then((data) => res.send({ success: true, data }))
		.catch((error) => res.send({ success: false, error }))
})
