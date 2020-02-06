module.exports = process.env.NODE_ENV === 'production' ? require('./config/webpack.prod.config') : require('./config/webpack.dev.config');
