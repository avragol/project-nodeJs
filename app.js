const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('./utils/loggers/loggerService');
const cors = require('cors');
const handleError = require('./utils/handleError');
const router = require('./routes/router');
const connectToDB = require('./models/connectToDB');
const app = express();

/* SETTINGS */
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:3000', 'http://localhost:8181'],
  optionsSuccessStatus: 200
}));
app.use(logger());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
connectToDB();

/* ROUTER */
app.use("/api", router);
app.use((req, res) => {
  handleError(res, "page not found", 404);
});

/* ERROR HANDELER */
app.use((err, req, res, next) => {
  handleError(res, err.message, 500);
})


module.exports = app;
