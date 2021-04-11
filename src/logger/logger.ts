import { Express, Request } from 'express';
import fs from 'fs-extra';
import luxon from 'luxon';
import pino, { DestinationStream } from 'pino';

import pad from './logger-utils';

const logFileSuffix = 'log-middleware';

if (!fs.existsSync('../../log')) {
    fs.mkdirSync('../../log');
}

const now = new Date();

const logFile = `${logFileSuffix}_${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}.log`;

const logStream: DestinationStream =
    process.env.DEBUG_OUTPUT === 'true' ? pino.destination(1) : pino.destination(`../../log/${logFile}`);

const Logger = pino(
    {
        prettyPrint: true,
        name: process.env.APP_ID,
        level: process.env.LOG_LEVEL,
    },
    logStream,
);

export default Logger;
