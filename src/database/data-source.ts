import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  // url: 'postgres://postgres:@localhost:5432/postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'postgres',
  synchronize: false,
  logging: false,
  // entities: ['src/**/*.entity.ts'],
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
