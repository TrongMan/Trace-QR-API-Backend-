import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly cfg: ConfigService) {}

  getHello(): string {
    const dbUrl = this.cfg.get<string>('DATABASE_URL');
    return `DB URL: ${dbUrl}`;
  }
}
