import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { FastifyInstance } from 'fastify';

export const addValidationPrehandler = (app: FastifyInstance): void => {
  app.addHook('preHandler', (req, reply, done) => {
    const validationType = (reply.context.config as any)?.ValidationType as any;
    const nonInstantiated = req.body as any;
    if (validationType) {
      const validationErrors = (nonInstantiated && validateSync(plainToClass(validationType, nonInstantiated))) || [{ property: 'body' }];

      if (validationErrors.length) {
        return reply.status(400).send({ validation: validationErrors });
      }
    }

    return done();
  });
};
