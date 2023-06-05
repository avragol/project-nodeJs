const fs = require('fs');
const path = require('path');

const saveErrorMessage = (errorMessage) => {

    const currentDate = new Date();
    const logFileName = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}.log`;
    const logFilePath = path.join(__dirname, logFileName);

    const logEntry = `${currentDate.toISOString()} - ${errorMessage}\n`;

    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Failed to save error message:', err);
        }
    });
};

module.exports = saveErrorMessage;
