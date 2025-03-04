import { Module } from '@nestjs/common';
import { VendorController } from './vendor.controller';

@Module({
  controllers: [VendorController]
})
export class VendorModule {}
