import { Controller,Get ,Param,Post,Body} from '@nestjs/common';
import { getServiceByCategoryORServiceSlugDTO ,EnqueryFormDto,ServiceIdDTO} from 'src/dto/public.dto';
import {PublicService} from 'src/public/public.service'
@Controller('/api/v1/public')
export class PublicController {

        constructor(private readonly publicSerivce:PublicService){}


        @Get('/categories')
        async popularCategories(){
                const res_obj = await this.publicSerivce.popularCategories();
                return res_obj
        }

        @Get('/services')
        async popularServices(){
                const res_obj = await this.publicSerivce.popularServices();
                return res_obj
        }
        @Get('/all-services')
        async showAllServices(){
                const res_obj = await this.publicSerivce.showAllServices();
                return res_obj
        }
        @Get('/all-services/:slug')
        async showAllServicesbySlug(@Param('slug') slug:string){
                const res_obj = await this.publicSerivce.showAllServicesbySlug(slug);
                return res_obj
        }

        @Get('/all-categories')
        async showAllCategories(){
                const res_obj = await this.publicSerivce.showAllCategories();
                return res_obj
        }

        @Get('/service/:category/:service')
        async getServiceByCategoryORServiceSlug(@Param() data:getServiceByCategoryORServiceSlugDTO){
                const res_obj = await this.publicSerivce.getServiceByCategoryORServiceSlug(data);
                return res_obj
        }

        

        @Post("/enquery/:service")
        async addEnqueryDetails(@Body() data:EnqueryFormDto,@Param() params:ServiceIdDTO){
                const res_obj = await this.publicSerivce.addEnqueryDetails(data,params.service);
                return res_obj
        }
        
    

}
