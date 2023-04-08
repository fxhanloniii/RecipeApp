// This connects the config file that links MongoDB and Mongoose to the rules for each of the dbs we create
require('../config/connection');

module.exports = {
    Recipe: require('./recipe')
};