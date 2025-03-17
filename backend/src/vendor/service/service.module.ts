import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MongooseModule } from '@nestjs/mongoose';
import {Service,ServiceSchema} from 'src/models/Service.model'
import {Category,CategorySchema} from 'src/models/Category.model'
@Module({
  imports:[
    MongooseModule.forFeature([
          {
            name: Service.name,
            schema: ServiceSchema
          },
          {
            name: Category.name,
            schema: CategorySchema
          }
          // {
          //   // name:User.name
          // }
        ]),
      MulterModule.register({
             storage:diskStorage({
              filename(req, file, callback) {
                const filename = `${Date.now()}-vendor-service-${file.originalname}`;
                callback(null, filename);
              },
             })
            })
  ],
  controllers: [ServiceController],
  providers: [ServiceService]
})
export class ServiceModule {}
