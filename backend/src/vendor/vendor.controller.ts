import { Controller ,UseGuards,Get,Param,Query, Req,Put,Body} from '@nestjs/common';
import {VendorGuard} from 'src/guards/vendor/vendor.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import{VendorService} from './vendor.service'
import {PaginationDTO, VendorServiceIdDTO,UpdateStatusDTO} from './vendorDto/service.dto' 

@Controller('/api/v1/vendor')
@UseGuards(AuthGuard,VendorGuard)
export class VendorController {
    constructor(private readonly VendorService:VendorService){}
     @Get("/enqueries")
       async getAllEnquries(@Query() data:PaginationDTO,@Req() req:any){
            const res_obj = await this.VendorService.getAllEnquries(data,req.user);
            return res_obj;
        }

        @Get("/enquery/:service")
       async getEnqueryById(@Param() data:VendorServiceIdDTO,@Req() req:any){
            const res_obj = await this.VendorService.getEnqueryById(data.service,req.user);
            return res_obj;
        }
        @Put("/enquery/status/:service")
        async updateEnqueryStatus(@Param() data:VendorServiceIdDTO,@Req() req:any,@Body() body:UpdateStatusDTO){
             const res_obj = await this.VendorService.updateEnqueryStatus(data.service,req.user,body);
             return res_obj;
         }
}
