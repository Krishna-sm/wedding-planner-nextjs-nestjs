import { Controller ,UseGuards,Get} from '@nestjs/common';
import {VendorGuard} from 'src/guards/vendor/vendor.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('/api/v1/vendor')
@UseGuards(AuthGuard,VendorGuard)
export class VendorController {
     @Get("/")
        hello(){
            return "hello vendor";
        }
}
