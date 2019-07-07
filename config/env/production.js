const config = {
    host: 'automation.iosense.io',
    port: 4001,

    mongodb: {
        uri: 'mongodb://mongodb1.iosense.io:27017,mongodb2.iosense.io:27017,mongodb3.iosense.io:27017/productionDB?replicaSet=rs0'
    },

    DataAPILayerOptions: {
        host: 'api.faclon.com'
    },
    
    NotifEngineOptions: {
        host: 'notifio.iosense.io'
    },

    MQTTConfig: {
        clientId: 'appServer'
    },

    logger: {
        level: 'debug',
        format: 'combined'
    }
};

module.exports = config;
