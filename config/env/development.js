const config = {
    mongodb: {
        debug: true
    },

    redis_client_host: 'localhost',
    
    ReportsIOOptions: {
        host: 'reports.iosense.io'
    },
    
    logger: {
        level: 'debug',
        format: 'combined'
    }
};

module.exports = config;
