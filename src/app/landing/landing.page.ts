import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from "../services/user.service"

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.css']
})
export class LandingPage implements OnInit {

  constructor(private userService: UserService, private readonly router: Router) { }

  ngOnInit(): void {
    if(!!this.userService.getCurrentUser()) {
      this.router.navigate(["/catalogue"]);
    }
  }

  public onSubmit(loginForm: NgForm): void {
    this.userService.login(loginForm.value.username);
    this.router.navigate(["/catalogue"]);
  }

}
