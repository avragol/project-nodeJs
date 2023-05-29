const chalk = require('chalk');

const handleError = (response, message = `error from server`, status) => {
    console.log(chalk.redBright(`err msg from handle error: ${message}`));
    response.status(status).json(message);
}

module.exports = handleError;