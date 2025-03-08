import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { CategoryModule } from './category/category.module';

@Module({
  providers: [AdminService],
  controllers: [AdminController],
  imports: [CategoryModule]
})
export class AdminModule {}
