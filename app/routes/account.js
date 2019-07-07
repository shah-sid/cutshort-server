
const app = module.exports = require('express')();

app.use('/dashboard', require('./dashboard'));
app.use('/widget', require('./widget'));
app.use('/widgetType', require('./widgetType'));