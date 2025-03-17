import { Module } from '@nestjs/common';
import { VendorController } from './vendor.controller';
import { ServiceModule } from './service/service.module';

@Module({ 
  controllers: [VendorController],
  imports: [ServiceModule]
})
export class VendorModule {}
