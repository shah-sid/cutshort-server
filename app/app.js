import express from 'express';
import config from './../config';
import http from 'http';
import cookieParser from 'cookie-parser';
import path from 'path';
import mongoose from 'mongoose';
import routes from './routes';
import bodyParser from 'body-parser';

/** Create express app */
const app = express();

/** Set configurations */
app.config = config;

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

/** Body Parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Mongo Configuration */
app.db = mongoose.createConnection(app.config.mongodb.uri);

/** Mongo Connection Error */
app.db.on('error', () => {
	console.log('Error connecting to mongoose');
});

/** Enable CORS */
const enableCORS = function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, refresh_token, access_token, Access-Control-Allow-Origin');
	next();
};
app.use(enableCORS);

export default {
	db: app.db
};
/** Mongo connected successfully */
app.db.once('open', () => {
	console.log('Mongo Db connected!');
});

/** Set up Schema */
require('./models/index')(app, mongoose);

/** Setup Swagger */
//require('./../swagger')(app);

/** Mount routes */
app.use(routes);

/** Create http server */
app.server = http.createServer();
app.listen(app.config.port, () => {
	console.log(`Server listening on ${app.config.host}:${app.config.port}`);
});
