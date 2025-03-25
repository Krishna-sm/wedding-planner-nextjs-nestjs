import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/models/Category.model';
import { Service, ServiceSchema } from 'src/models/Service.model';

@Module({
  imports:[
     MongooseModule.forFeature([
          {
            name: Category.name,
            schema: CategorySchema
          },
          {
            name:Service.name,
            schema:ServiceSchema
          }
        ]),
  ],
  controllers: [PublicController],
  providers: [PublicService]
})
export class PublicModule {}
