import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokemon-trainer';

  constructor(private userService: UserService, private readonly router: Router) { }

  public logoutButtonHandler() {
    this.userService.logout();
    this.router.navigate([""]);
  }
}
