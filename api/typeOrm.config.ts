import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

// load .env from project root (handles running from dist or src)
config({ path: join(process.cwd(), '.env') });

// normalize DB_URL: dotenv may include surrounding quotes in the .env value
const rawDbUrl = process.env.DB_URL;
const DB_URL = rawDbUrl ? rawDbUrl.replace(/^['"]|['"]$/g, '') : undefined;

const isProduction = process.env.NODE_ENV === 'production';

export const typeormModuleOptions: TypeOrmModuleOptions = isProduction
  ? {
      type: 'postgres',
      url: DB_URL,
      entities: [join(__dirname, 'src/**/*.entity{.ts,.js}')],
      migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
    }
  : {
      type: 'sqlite',
      database: DB_URL,
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
