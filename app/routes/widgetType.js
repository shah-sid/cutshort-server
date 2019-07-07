const app = module.exports = require('express')();
const { findAll,find, create, edit, deleteWidgetType } = require('./../actions/widgetType');

app.get('/', (req, res) => {
	findAll()
		.then((data) => res.send({ success: true, data }))
		.catch((error) => res.send({ success: false, error }))
});

app.get('/:id', (req, res) => {
	find(req.params.id)
		.then((data) => res.send({ success: true, data }))
		.catch((error) => res.send({ success: false, error }))
});

app.post('/', (req, res) => {
	create(req.body.title, req.body.type,req.body.description,req.body.config)
		.then((data) => res.send({ success: true, data }))
		.catch((error) => res.send({ success: false, error }))
});

app.put('/', (req, res) => {
	edit(req.body._id, req.body.title, req.body.type,req.body.description,req.body.config)
		.then((data) => res.send({ success: true, data }))
		.catch((error) => res.send({ success: false, error }))
})

app.delete('/:id', (req, res) => {
	deleteWidgetType(req.params.id)
		.then((data) => res.send({ success: true, data }))
		.catch((error) => res.send({ success: false, error }))
})
