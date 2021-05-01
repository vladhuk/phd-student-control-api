import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ScientificDirectorsModule } from './scientific-directors/scientific-directors.module';
import { PhdStudentsModule } from './phd-students/phd-students.module';
import { GlobalGuard as AppGuard } from './_common/guards/app.guard';
import { JwtAuthGuard } from './_common/guards/jwt-auth.guard';
import { RolesGuard } from './_common/guards/roles.guard';
import { IndividualPlansModule } from './individual-plans/individual-plans.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        database: configService.get('DB_NAME'),
        password: configService.get('DB_PASSWORD'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    AuthModule,
    ScientificDirectorsModule,
    PhdStudentsModule,
    IndividualPlansModule,
  ],
  providers: [
    JwtAuthGuard,
    RolesGuard,
    {
      provide: APP_GUARD,
      useClass: AppGuard,
    },
  ],
})
export class AppModule {}
