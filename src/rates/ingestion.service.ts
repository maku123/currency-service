import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { ExchangeRate } from './entities/exchange-rate.entity';

@Injectable()
export class IngestionService {
  private readonly logger = new Logger(IngestionService.name);

  constructor(
    private readonly httpService: HttpService,

    @InjectRepository(ExchangeRate)
    private readonly exchangeRateRepo: Repository<ExchangeRate>,
  ) {}

  async fetchAndStoreRates(base: string = 'USD') {
    try {
      const url = `https://api.frankfurter.dev/v1/latest?base=${base}`;

      this.logger.log(`Fetching exchange rates for base: ${base}`);

      const response = await firstValueFrom(
        this.httpService.get(url),
      );

      const data = response.data;

      const fetchedAt = new Date();

      const rates = data.rates;

      const records: ExchangeRate[] = [];

      // Transform JSON to Entities
      for (const targetCurrency in rates) {
        const rateValue = rates[targetCurrency];

        const record = this.exchangeRateRepo.create({
          baseCurrency: base,
          targetCurrency,
          rate: rateValue,
          fetchedAt,
        });

        records.push(record);
      }

      // Save all records in bulk to the database
      await this.exchangeRateRepo.save(records);

      this.logger.log(
        `Stored ${records.length} exchange rates successfully`,
      );

      return {
        message: 'Rates fetched and stored successfully',
        count: records.length,
      };
    } catch (error) {
      this.logger.error(
        'Failed to fetch and store exchange rates',
        error.message,
      );
      throw error;
    }
  }
}