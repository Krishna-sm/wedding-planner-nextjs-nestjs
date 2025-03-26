import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/models/Category.model';
import { Service, ServiceSchema } from 'src/models/Service.model';
import { User, UserSchema } from 'src/models/User.model';
import { Profile, ProfileSchema } from 'src/models/Profile.model';
import { Enquery,EnquerySchema } from 'src/models/Enquery.model';

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
          }, {
            name:User.name,
            schema:UserSchema
          },
          {
            name:Profile.name,
            schema:ProfileSchema
          },
          {
            name:Profile.name,
            schema:ProfileSchema
          },
          {
            name:Enquery.name,
            schema:EnquerySchema
          }
        ]),
  ],
  controllers: [PublicController],
  providers: [PublicService]
})
export class PublicModule {}
