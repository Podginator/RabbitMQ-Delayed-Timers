import { CreateTimer } from './CreateTimer';
import { v4 } from 'uuid';

export class GeneratedTimer {
  id!: string;
  epochPublished!: number;
  epochSend!: number;
  hasInvoked = false;
  url!: string;

  public static createFromNow(createTimer: CreateTimer): GeneratedTimer {
    const id = v4();
    const { hours, minutes, seconds } = createTimer;
    const ttlNow = Date.now();
    const ttlMilliseconds = (hours * 60 * 60 + minutes * 60 + seconds) * 1000;

    return { id, epochSend: ttlNow + ttlMilliseconds, hasInvoked: false, epochPublished: ttlNow, url: createTimer.url };
  }
}
