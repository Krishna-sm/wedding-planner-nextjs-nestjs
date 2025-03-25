import { Controller,Get ,Param} from '@nestjs/common';
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

        
        
    

}
