import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CreateTimer } from '../models/CreateTimer';
import { enqueueTimer } from '../lib/enqueue/timers';
import { GeneratedTimer } from '../models/GeneratedTimer';
import { persistTimer, deleteTimer, getTimer } from '../lib/repository/timers';
import { logger } from '../utils/logging';
import { TimeRemainingTimer } from '../models/TimeRemainingTimer';

const createTimerRoute = async (req: FastifyRequest<{ Body: CreateTimer }>, res: FastifyReply): Promise<void> => {
  const { body } = req;
  const generatedTimer = GeneratedTimer.createFromNow(body);

  try {
    await persistTimer(generatedTimer);
    await enqueueTimer(generatedTimer);
  } catch (e) {
    logger.error(`Error Encountered while generating timer, reverting any changes ${e}`);
    await deleteTimer(generatedTimer.id);
    throw e;
  }

  res.send(generatedTimer);
};

const getTimerRoute = async (req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply): Promise<void> => {
  const { id } = req.params;
  const timer = await getTimer(id);

  if (!timer) {
    res.status(404).send({ message: 'Timer not found' });
    return;
  }

  res.send(TimeRemainingTimer.fromGeneratedTimer(timer));
};

export function registerRoutes(app: FastifyInstance): void {
  app.route({
    url: '/timers',
    method: 'POST',
    config: { ValidationType: CreateTimer },
    handler: createTimerRoute,
  });

  app.route({
    url: '/timers/:id',
    method: 'GET',
    handler: getTimerRoute,
  });
}
