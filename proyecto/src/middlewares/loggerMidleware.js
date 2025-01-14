import { devLogger, prodLogger } from '../config/logger.js';

const loggerMiddleware = (req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        req.logger = prodLogger;
    } else {
        req.logger = devLogger;
    }
    next();
};

export default loggerMiddleware;