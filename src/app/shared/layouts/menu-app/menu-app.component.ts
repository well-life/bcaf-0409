import { Component } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-menu-app',
  templateUrl: './menu-app.component.html',
  styleUrl: './menu-app.component.css'
})
export class MenuAppComponent {

  constructor(private authService: AuthenticationService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  
}
