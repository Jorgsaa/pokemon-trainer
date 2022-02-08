import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokemon-trainer';

  constructor(private userService: UserService, private router: Router) {}

  public logoutButtonHandler() {
    this.userService.logout();
  }

  get href(): string {  return this.router.url; }
  get navlinksVisible(): boolean { return this.href === "/catalogue" || this.href === "/trainer"}

}
