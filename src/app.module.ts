import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EmployeesModule,

    // untuk membatasi request yang masuk hanya 3 kali dalam 1 detik
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },

      // untuk membatasi request yang masuk hanya 100 kali dalam 1 menit
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
