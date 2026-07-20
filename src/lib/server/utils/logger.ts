import { createLogger, format, transports } from 'winston';
import { env } from 'node:process';

// JSON lines on stdout; Docker/journald collect from there.
export const logger = createLogger({
	level: env.LOG_LEVEL ?? 'info',
	format: format.combine(format.timestamp(), format.errors({ stack: true }), format.json()),
	transports: [new transports.Console()]
});
