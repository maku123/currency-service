import {
  Controller,
  Post,
  Get,
  Query,
} from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { RatesService } from './rates.service';
import { LatestRatesDto } from './dto/latest-rates.dto';
import { AverageRateDto } from './dto/average-rate.dto';

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
  async getLatest(@Query() query: LatestRatesDto) {
    return this.ratesService.getLatestRates(query.base);
  }

  @Get('average')
  async getAverage(@Query() query: AverageRateDto) {
    return this.ratesService.getAverageRate(
      query.base,
      query.target,
      query.period,
    );
  }
}