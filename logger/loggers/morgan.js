const morgan = require('morgan');
const chalk = require('chalk');

const logger = morgan((req, res) => {
    if (res.status === 400) {
        console.log(chalk.redBright(`[:date] :method :url 400 :response-time ms`));
    } else {
        console.log(chalk.cyanBright(`[:date] :method :url :status :response-time ms`));
    }
});

module.exports = logger;