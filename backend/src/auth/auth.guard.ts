import { CanActivate, ExecutionContext, Injectable ,UnauthorizedException} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt'; 

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private readonly jwtService:JwtService){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
          try{
 
                const request = context.switchToHttp().getRequest()
                const auth_token = request.headers['authorization'] ||''

                if(!auth_token || !auth_token.startsWith("Bearer ")){
                  throw new UnauthorizedException("No Authorization Token")
                }
                const token = auth_token.split(" ")[1]
                if(!token){
                  throw new UnauthorizedException("Invalid Authorization Token")
                }
                const payload = this.jwtService.verify(token)
                request.user = payload.userId;
                request.type = payload.type;

            return true;
          }
          catch(e){
              throw new UnauthorizedException(e.message)
          }


  }
}
