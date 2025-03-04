import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
      try {
          
        const request = context.switchToHttp().getRequest();
        if(request.type!=="admin"){
          throw new UnauthorizedException("Only Admins can access this Route")   
        }

        return true;
      } catch (error) {
            throw new UnauthorizedException("User Can not access This Route")
      }
  }
}
