import { User } from './users/user.entity';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'mysql', // or your DB type
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'payment-share',
  entities: [User],
  synchronize: false,
  migrations: ['src/db/migrations/*.ts'],
  migrationsRun: false,
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'all',
});

module.exports = AppDataSource;
