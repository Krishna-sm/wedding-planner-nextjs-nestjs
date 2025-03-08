import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/models/Category.model';
import { User } from 'src/models/User.model';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  imports:[
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema
      },
      // {
      //   // name:User.name
      // }
    ]),
      MulterModule.register({
         storage:diskStorage({
          filename(req, file, callback) {
            const filename = `${Date.now()}-category-${file.originalname}`;
            callback(null, filename);
          },
         })
        })
  ]
})
export class CategoryModule {}
