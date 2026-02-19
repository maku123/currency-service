import { Controller, Post } from '@nestjs/common';
import { IngestionService } from './ingestion.service';

@Controller('rates')
export class RatesController {
  constructor(
    private readonly ingestionService: IngestionService,
  ) {}

  @Post('fetch')
  async fetchRates() {
    return this.ingestionService.fetchAndStoreRates('USD');
  }
}