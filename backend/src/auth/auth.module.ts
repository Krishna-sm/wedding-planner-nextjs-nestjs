import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/User.model';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:User.name,
      schema:UserSchema
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
