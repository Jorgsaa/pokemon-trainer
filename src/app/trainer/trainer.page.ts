import { Component, OnInit } from '@angular/core';
import { User } from '../models';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage implements OnInit {

  constructor(
    private readonly userService: UserService,
  ) { }

  ngOnInit(): void {
    // Temporary for testing. User will be set when the login function works
    this.userService.fetchContacts();
    this.userService.setUser(this.userService.users()[0])
  }

  get user(): User | undefined {
    return this.userService.getCurrentUser();
  }

  get pokemons(): string[] | undefined {
    return this.userService.getCurrentUserPokemons()
  }
}
