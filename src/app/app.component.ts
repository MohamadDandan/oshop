import { UserService } from 'shared/service/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'shared/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(
    private auth: AuthService, 
    private router: Router,
    private UserService: UserService){

    auth.user$.subscribe(user =>{
      if(user) {
        let returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) {
          UserService.save(user)
          
        } else {
          // Handle the case when returnUrl is null
          // For example, navigate to a default URL
          router.navigate(['/default-url']);
        }
      }
    });
  }
}
