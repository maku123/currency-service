import { Module } from '@nestjs/common';
import { RatesModule } from './rates/rates.module';
import { HealthModule } from './health/health.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [RatesModule, HealthModule, DatabaseModule],
})
export class AppModule {}
