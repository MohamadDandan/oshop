import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable, switchMap ,of} from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  user$: Observable<any> ;
  
 
  
  constructor(
    private afAuth:AngularFireAuth,
    private route:ActivatedRoute,
    private userService:UserService) { 
      
    this.user$= afAuth.authState;
  }

   
     
    

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    this.afAuth.signInWithRedirect(new GoogleAuthProvider());
  }
  logout(){
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser|null > {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) return this.userService.getUser(user.uid).valueChanges();
        return of(null);
      })
    );
  }
}
