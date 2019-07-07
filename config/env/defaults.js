const config = {
    projectName: process.env.PROJECTNAME,
    version: process.env.VERSION,
    description: process.env.DESCRIPTION,

    host: process.env.HOST,
    port: process.env.PORT,

    mongodb: {
        uri: process.env.DB_URI,
        debug: false
    },

    redis_client_host: process.env.REDIS_HOST,
    redis_client_port: process.env.REDIS_PORT,
    redis_client_db: process.env.REDIS_DB,

    NotifEngineOptions: {
        host: process.env.NOTIFENGINE_HOST,
        port: process.env.NOTIFENGINE_PORT,
        headers: {
            'Content-Type': 'application/json'
        }
    },

    DataAPILayerOptions: {
        host: process.env.APILAYER_HOST,
        port: process.env.APILAYER_PORT,
        headers: {
            'Content-Type': 'application/json'
        }
    },

    MQTTConfig: {
        host: process.env.MQTT_HOST,
        port: process.env.MQTT_PORT,
        clientId: process.env.MQTT_CLIENTID,
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD,
        qos: process.env.MQTT_QOS
	},
	
	JWKKeySet: {
		keys: [{
			kty: process.env.JWKKEYSET_KTY,
			kid: process.env.JWKKEYSET_KID,
			use: process.env.JWKKEYSET_USE,
			alg: process.env.JWKKEYSET_ALG,
			k: process.env.JWKKEYSET_K
		}]
	},

    logger: {
        level: 'info',
        format: 'tiny'
    }
};

/** Set the environment to default/development */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
config.env = process.env.NODE_ENV;
console.log(`Loading ${process.env.NODE_ENV} environment...`);

module.exports = config;
