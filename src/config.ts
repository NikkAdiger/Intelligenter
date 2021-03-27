import * as configEnv  from 'dotenv';
configEnv.config();
 
const basicConfig = {
    production: false,
    release: false,

    analysisAfterReboot: true
};

const connection = {
    dev: {
        webServer: {
            host: '0.0.0.0',
            port: 3000
        },

    },

    release: {
        webServer: {
            host: '0.0.0.0',
            port: 3000
        },

    },

    production: {
        webServer: {
            host: process.env.HOST,
            port: process.env.PORT
        },
    }
}

export let environment;
if (basicConfig.production) {
    environment = Object.assign(basicConfig, connection.production)
} else if (basicConfig.release) {
    environment = Object.assign(basicConfig, connection.release)
} else {
    environment = Object.assign(basicConfig, connection.dev);
};