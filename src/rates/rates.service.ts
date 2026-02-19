import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExchangeRate } from './entities/exchange-rate.entity';

@Injectable()
export class RatesService {
  constructor(
    @InjectRepository(ExchangeRate)
    private readonly exchangeRateRepo: Repository<ExchangeRate>,
  ) {}

  async getLatestRates(base: string) {
    // find the latest timestamp
    const latest = await this.exchangeRateRepo
      .createQueryBuilder('rate')
      .select('MAX(rate.fetched_at)', 'max')
      .where('rate.base_currency = :base', { base })
      .getRawOne();

    if (!latest?.max) {
      return { message: 'No data found' };
    }

    // fetch rows with that timestamp
    const rows = await this.exchangeRateRepo.find({
      where: {
        baseCurrency: base,
        fetchedAt: latest.max,
      },
    });

    // transform to response format
    const rates = {};
    rows.forEach((row) => {
      rates[row.targetCurrency] = Number(row.rate);
    });

    return {
      base,
      timestamp: latest.max,
      rates,
    };
  }

  async getAverageRate(
    base: string,
    target: string,
    period: string,
  ) {
    const hours = parseInt(period.replace('h', ''), 10);
  
    const fromDate = new Date();
    fromDate.setHours(fromDate.getHours() - hours);
  
    const result = await this.exchangeRateRepo
      .createQueryBuilder('rate')
      .select('AVG(rate.rate)', 'average')
      .where('rate.base_currency = :base', { base })
      .andWhere('rate.target_currency = :target', { target })
      .andWhere('rate.fetched_at >= :fromDate', { fromDate })
      .getRawOne();
  
    return {
      base,
      target,
      period,
      average_rate: Number(result.average) || 0,
    };
  }
}