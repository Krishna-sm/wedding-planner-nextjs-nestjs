import { Module } from '@nestjs/common';
import { VendorController } from './vendor.controller';
import { ServiceModule } from './service/service.module';
import { VendorService } from './vendor.service';
import { Enquery,EnquerySchema } from 'src/models/Enquery.model';
import { User, UserSchema } from 'src/models/User.model';
import { Profile, ProfileSchema } from 'src/models/Profile.model';
import { Category, CategorySchema } from 'src/models/Category.model';
import { Service, ServiceSchema } from 'src/models/Service.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({ 
  controllers: [VendorController],
  imports: [ServiceModule,
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
            name:Enquery.name,
            schema:EnquerySchema
          }
        ]),

  ],
  providers: [VendorService]
})
export class VendorModule {}
