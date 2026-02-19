import { Controller, Get } from '@nestjs/common';
import { IngestionService } from './ingestion.service';

@Controller('rates')
export class RatesController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Get('test-fetch')
  async testFetch() {
    return this.ingestionService.fetchRates('USD');
  }
}