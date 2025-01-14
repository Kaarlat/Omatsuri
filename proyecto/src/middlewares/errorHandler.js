import ErrorTypes from '../errorTypes.js';

const errorHandler = (err, req, res, next) => {
    switch (err.type) {
        case ErrorTypes.INVALID_PARAM:
            res.status(400).json({ error: 'INVALID_PARAM', message: err.message });
            break;
        // Otros casos de error pueden ser manejados aquí
        default:
            res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong' });
            break;
    }
};

export default errorHandler;