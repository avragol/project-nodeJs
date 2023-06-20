const { verifyToken } = require('../utils/token/tokenService');
const handleError = require('../utils/handleError');

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers["auth-token"]) { handleError(res, "please provide token", 401) }
        else {
            const userData = await verifyToken(req.headers["auth-token"]);
            req.userData = userData;
            next();
        }
    } catch (err) {
        handleError(res, err.message, 401)
    }
};

module.exports = authMiddleware;