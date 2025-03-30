import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/User.model';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Profile, ProfileSchema } from 'src/models/Profile.model';
import { Category, CategorySchema } from 'src/models/Category.model';
import { Service, ServiceSchema } from 'src/models/Service.model';
import { Enquery, EnquerySchema } from 'src/models/Enquery.model';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:User.name,
      schema:UserSchema
    },
    {
      name:Profile.name,
      schema:ProfileSchema
    },
    {
      name:Category.name,
      schema:CategorySchema
    },
    {
      name:Service.name,
      schema:ServiceSchema
    },
    {
      name:Enquery.name,
      schema:EnquerySchema
    }
  ]),
    MulterModule.register({
     storage:diskStorage({
      filename(req, file, callback) {
        const filename = `${Date.now()}-${file.originalname}`;
        callback(null, filename);
      },
     })
    })
],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
