import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class IngestionService {
  private readonly logger = new Logger(IngestionService.name);

  constructor(private readonly httpService: HttpService) {}

  async fetchRates(base: string = 'USD') {
    try {
      const url = `https://api.frankfurter.dev/v1/latest?base=${base}`;

      this.logger.log(`Fetching exchange rates for base: ${base}`);

      const response = await firstValueFrom(
        this.httpService.get(url),
      );

      const data = response.data;

      this.logger.log(`Successfully fetched rates for ${base}`);

      return data;
    } catch (error) {
      this.logger.error(
        `Failed to fetch exchange rates`,
        error.message,
      );
      throw error;
    }
  }
}