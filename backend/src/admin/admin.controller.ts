import { Controller,UseGuards,Get } from '@nestjs/common';
import {AdminGuard} from 'src/guards/admin/admin.guard'
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('/api/v1/admin')
@UseGuards(AuthGuard,AdminGuard)
export class AdminController {
    @Get("/")
    hello(){
        return "hello admin";
    }
}
