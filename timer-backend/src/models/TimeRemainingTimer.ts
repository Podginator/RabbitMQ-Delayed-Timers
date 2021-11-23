import { GeneratedTimer } from './GeneratedTimer';

export class TimeRemainingTimer {
  id!: string;
  timeRemaining!: number;

  public static fromGeneratedTimer(generatedTimer: GeneratedTimer): TimeRemainingTimer {
    const timeRemainingTimer = new TimeRemainingTimer();
    const epochNow = Date.now();
    timeRemainingTimer.id = generatedTimer.id;
    timeRemainingTimer.timeRemaining = Math.max(0, Math.floor(generatedTimer.epochPublished - epochNow)) / 1000;
    return timeRemainingTimer;
  }
}
