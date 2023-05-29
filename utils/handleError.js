const chalk = require('chalk');

const handleError = (response, message = `error from server`, status) => {
    console.log(chalk.redBright(message));
    response.status(status).json(message);
}

module.exports = handleError;