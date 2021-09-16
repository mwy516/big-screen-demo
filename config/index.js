const env = process.env.NODE_ENV;

const config = {
  development: {
    api: 'http://192.168.10.184/api/',
  },
  production: {
    api: 'www.jd.com',
  },
};

module.exports = config[env];
