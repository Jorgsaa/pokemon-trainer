import { Component, Input, OnInit, Output } from '@angular/core';
import { Pokemon, User } from '../models';
import { PokemonService } from '../services/pokemon.service';
import { UserLoggedInService } from '../services/user-logged-in.service';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage implements OnInit {

  @Output() cataloguePokemon: Pokemon[] = []

  pageLength: number = 50
  offset: number = 0

  constructor(
    private readonly userSecvice: UserService,
    private readonly userLoggedInService: UserLoggedInService,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    // Temporary for testing. User will already be sett when the login function works
    this.userSecvice.fetchContacts();
    this.userLoggedInService.setUser(this.userSecvice.users()[0])

    // Manually load pokemons the 1st time
    this.loadMore()
  }

  get user(): User | undefined {
    return this.userLoggedInService.user()
  }

  get pokemons(): string[] | undefined {
    return this.userLoggedInService.pokemons()
  }

// Convert every pokemon the user owns to a Pokemon-object (stop at the specified pageLength)
// Then insert these pokemons into the list of pokemons that will be displayed
// (next time this function is triggered, load the next specified number of pokemons (pageLength))
  loadMore(): void {
    const pokemons = this.userLoggedInService.pokemons()
    if (pokemons) {
      for (let index = this.offset, iterationCounter = 0; index < pokemons.length && iterationCounter < this.pageLength; index++, iterationCounter++, this.offset++) {
        const pokemonName = pokemons[index]
        const currentPokemon: Pokemon = {
          name: pokemonName,
          url: "", // Is this needed?
        }
        this.cataloguePokemon.push(currentPokemon)
      }
    }
  }
}
