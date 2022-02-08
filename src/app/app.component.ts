import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokemon-trainer';

  constructor(private userService: UserService) { }

  public logoutButtonHandler() {
    this.userService.logout();
  }
}
