import fastify from 'fastify';
import * as errors from './utils/errors';
import * as validation from './utils/validation';
import * as timers from './routes/timers';
import { logger } from './utils/logging';
import 'reflect-metadata';

export const app = fastify();

errors.addErrorHandler(app);
validation.addValidationPrehandler(app);
timers.registerRoutes(app);

app.listen(8000, '0.0.0.0', (err) => {
  if (err) logger.error(err);
  logger.log('server listening on 8000');
});
