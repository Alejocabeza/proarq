import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

config({
  path: '.env',
});

const isProduction = process.env.NODE_ENV === 'production';

export const typeormModuleOptions: TypeOrmModuleOptions = isProduction
  ? {
      type: 'postgres',
      url: process.env.DB_URL,
      entities: [join(__dirname, 'src/**/*.entity{.ts,.js}')],
      migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
    }
  : {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [join(__dirname, 'src/**/*.entity{.ts,.js}')],
      migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
      synchronize: false,
    };

const options: DataSourceOptions = {
  ...typeormModuleOptions,
  logging: !isProduction,
  migrationsTableName: 'migrations',
} as DataSourceOptions;

export default new DataSource(options);
