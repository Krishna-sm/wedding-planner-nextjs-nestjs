import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { JwtModule  } from '@nestjs/jwt';
import { VendorModule } from './vendor/vendor.module';
import { AdminModule } from './admin/admin.module';
import { PublicModule } from './public/public.module';
config({
  path:'.env'
})
@Module({
  imports: [AuthModule,MongooseModule.forRoot(process.env.MONGO_URI!),JwtModule.register({
    global: true,
    secret: process.env.JWT_AUTH,
    signOptions: { expiresIn: '5h' },
  }), VendorModule, AdminModule, PublicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
