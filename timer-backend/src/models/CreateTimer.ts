import { IsDefined, Min, Max } from 'class-validator';

export class CreateTimer {
  @IsDefined()
  @Min(0)
  @Max(24)
  hours: number = 0;

  @IsDefined()
  @Min(0)
  @Max(60)
  minutes: number = 0;

  @IsDefined()
  @Min(0)
  @Max(60)
  seconds: number = 0;

  @IsDefined()
  url!: string;
}
