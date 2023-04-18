import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../config';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, port } = configService.postgres || {};

        return {
          type: 'postgres',
          username: user || 'postgres',
          host: host || 'localhost',
          database: dbName || 'postgres',
          password: '',
          // password: process.env.POSTGRES_PASSWORD || '123456',
          port: port || 5432,
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const client = new Client({
          user: configService.postgres.user || 'postgres',
          host: configService.postgres.host || 'localhost',
          database: configService.postgres.dbName || 'postgres',
          // password: process.env.POSTGRES_PASSWORD || '123456',
          port: configService.postgres.port || 5432,
        });

        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
