import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity('exchange_rates')
  @Index(['baseCurrency', 'targetCurrency', 'fetchedAt'], { unique: true })
  export class ExchangeRate {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: 'base_currency', type: 'varchar', length: 10 })
    baseCurrency: string;
  
    @Column({ name: 'target_currency', type: 'varchar', length: 10 })
    targetCurrency: string;
  
    @Column({ type: 'decimal', precision: 10, scale: 6 })
    rate: number;
  
    @Column({ name: 'fetched_at', type: 'timestamp' })
    fetchedAt: Date;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  }
  