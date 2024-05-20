import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'shared/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private auth:AuthService, private router:Router){
        
  }
   
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {
      return this.auth.user$
      .pipe(
          map(isLoggedIn =>{
              if(isLoggedIn) return true
                 this.router.navigate(
                  ['/login'],{
                    queryParams: {
                      returnUrl: state.url
                    }
                  });
                  return false
          })
      )
  }
}