import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { PhdStudentsModule } from 'src/phd-students/phd-students.module';
import { ScientificDirectorsModule } from 'src/scientific-directors/scientific-directors.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    PhdStudentsModule,
    ScientificDirectorsModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: +configService.get('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
