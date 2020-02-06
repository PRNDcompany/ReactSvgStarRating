let config;
switch (process.env.NODE_ENV) {
  case 'production':
    config = require('./config/webpack.prod.config');
     break;
  case 'development':
    config = require('./config/webpack.dev.config');
    break;
  case 'site':
    config = require('./config/webpack.site.config');
    break;
}
module.exports = config;

