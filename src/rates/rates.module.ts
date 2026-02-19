import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ExchangeRate } from './entities/exchange-rate.entity';
import { IngestionService } from './ingestion.service';
import { RatesController } from './rates.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExchangeRate]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [IngestionService],
  exports: [IngestionService],
  controllers: [RatesController],
})
export class RatesModule {}