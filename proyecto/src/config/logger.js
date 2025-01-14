import { createLogger, format, transports } from 'winston';

const customLevels = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5
    },
    colors: {
        debug: 'blue',
        http: 'green',
        info: 'white',
        warning: 'yellow',
        error: 'red',
        fatal: 'magenta'
    }
};

const devLogger = createLogger({
    levels: customLevels.levels,
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    ),
    transports: [
        new transports.Console({ level: 'debug' })
    ]
});

const prodLogger = createLogger({
    levels: customLevels.levels,
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    ),
    transports: [
        new transports.Console({ level: 'info' }),
        new transports.File({ filename: 'errors.log', level: 'error' })
    ]
});

export { devLogger, prodLogger };