import { Controller, Get, Post, Query } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { RatesService } from './rates.service';

@Controller('rates')
export class RatesController {
  constructor(
    private readonly ingestionService: IngestionService,
    private readonly ratesService: RatesService,
  ) {}

  @Post('fetch')
  async fetchRates() {
    return this.ingestionService.fetchAndStoreRates('USD');
  }

  @Get('latest')
  async getLatestRates(@Query('base') base: string) {
    return this.ratesService.getLatestRates(base);
  }

  @Get('average')
  async getAverage(
    @Query('base') base: string,
    @Query('target') target: string,
    @Query('period') period: string,
  ) {
    return this.ratesService.getAverageRate(
      base,
      target,
      period,
    );
  }
}