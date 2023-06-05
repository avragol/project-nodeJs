const chalk = require('chalk');
const saveErrorMessage = require('../logs/logsController');

const handleError = (response, message = `error from server`, status) => {
    console.log(chalk.redBright(`err msg from handle error: ${message}`));
    saveErrorMessage(message);
    response.status(status).json({ "msg": message });
};

module.exports = handleError;