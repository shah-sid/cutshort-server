import swaggerJsDoc from 'swagger-jsdoc';
import config from './config';
import fs from 'fs';
import path from 'path';

module.exports = (app) => {
    const swaggerDefinition = {
        info: {
            title: config.projectName,
            version: config.version,
            description: config.description
        },
        host: `${config.host}:${config.port}`,
        basePath: '/'
    };    
    
    const options = {
        swaggerDefinition,
        apis: ['./app/routes/*.js', './app/actions/account/*.js', './app/models/schema/*.js']   // Look in these files for swagger definitions
    };
    const swaggerSpec = swaggerJsDoc(options);
    console.log('swagger spec', swaggerSpec);
    
    /** Main swagger configuration (Load this file in Swagger-UI) */
    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    /** Write json in swagger.json file for UI rendering */
    fs.writeFileSync(
        path.join(__dirname, './public/api-docs/swagger.json'),
        JSON.stringify(swaggerSpec, null, ' ')
    );
};

/**
 * Swagger UI: http://localhost:4001/api-docs/
 * Code: https://mherman.org/blog/swagger-and-nodejs/
 * Definition: https://docs.swagger.io/spec.html
 */