import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from 'shared/service/auth.service';
import { Observable, map, switchMap } from 'rxjs';
import { UserService } from 'shared/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth:AuthService,private userService:UserService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  MaybeAsync<GuardResult> {
    
      return this.auth.appUser$.pipe(
        map((user) => {
          if(user?.isAdmin) return true;
          
          return false;
        })
      )
      
   
  }
}
