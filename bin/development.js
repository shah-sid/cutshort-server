/** Bablify our code */
// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
require('babel-register')({
    presets: [ 'env' ]
});

// Import the rest of our application.
module.exports = require('../app/app.js');

/**
 * Babel command: npm install babel-register babel-preset-env --save-dev
    OR
    npm install babel-register babel-preset-es2015 babel-preset-stage-2 --save-dev
 */
