import { Component, OnInit } from '@angular/core';
import { User } from '../models';
import { UserLoggedInService } from '../services/user-logged-in.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage implements OnInit {

  constructor(
    private readonly userSecvice: UserService,
    private readonly userLoggedInService: UserLoggedInService
  ) { }

  ngOnInit(): void {
    // Temporary for testing. User will be sett when the login function works
    //this.userSecvice.fetchContacts();
    //this.userLoggedInService.setUser(this.userSecvice.users()[0])
  }

  get user(): User | undefined {
    return this.userLoggedInService.user()
  }

  get pokemons(): string[] | undefined {
    return this.userLoggedInService.pokemons()
  }
}
