
module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '134.122.68.124',
      username: 'root',
      pem: '~/.ssh/id_rsa'
    }
  },

  app: {
    name: 'mirroroffice-app',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: "https://app.mirroroffice.com",
      MONGO_URL: 'mongodb+srv://dbUser:ouA53VupXhGbDbiC@cluster0.egxur.mongodb.net/test',
    },

    docker: {
      image: 'abernix/meteord:node-12.14.0-base',
    },

    deployCheckWaitTime: 60,
    enableUploadProgressBar: true
  },

  proxy: {
    domains: 'app.mirroroffice.com',
    ssl: {
      letsEncryptEmail: 'jonathan@milliwayszurich.com',
      forceSSL: true 
    }
  }

};
