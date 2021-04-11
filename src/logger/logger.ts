import { Express, Request } from 'express';
import fs from 'fs-extra';
import luxon from 'luxon';
import pino, { DestinationStream } from 'pino';

import pad from './logger-utils';

const logFileSuffix = 'log-backend';

if (!fs.existsSync(`${__dirname}/log`)) {
    fs.mkdirSync(`${__dirname}/log`);
}

const now = new Date();

const logFile = `${logFileSuffix}_${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}.log`;

const logStream: DestinationStream =
    process.env.DEBUG_OUTPUT === 'true' ? pino.destination(1) : pino.destination(`../../log/${logFile}`);

export const Logger = pino(
    {
        prettyPrint: true,
        level: 'trace',
    },
    logStream,
);

