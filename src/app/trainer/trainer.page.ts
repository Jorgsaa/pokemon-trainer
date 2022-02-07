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

  constructor(
    private readonly userSecvice: UserService,
    private readonly userLoggedInService: UserLoggedInService,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    // Temporary for testing. User will be sett when the login function works
    this.userSecvice.fetchContacts();
    this.userLoggedInService.setUser(this.userSecvice.users()[0])

    // For pokemon list
    this.offset = 0
    this.loadMore()
  }

  get user(): User | undefined {
    return this.userLoggedInService.user()
  }

  get pokemons(): string[] | undefined {
    return this.userLoggedInService.pokemons()
  }

  //HHHJDKLHJHKLHDJKLHJKLHJKLHJ POKEMON-LIST
  @Output() cataloguePokemon: Pokemon[] = []
  
  pageLength: number = 50
  offset: number = 0
  


  loadMore1(): void {
    this.pokemonService.fetch(this.pageLength, this.offset)
    .subscribe(data => this.cataloguePokemon.push(...data))
    this.offset += this.pageLength
    console.log(this.offset);
  }

  loadMore(): void {
    const pokemons = this.userLoggedInService.pokemons()
    if (pokemons) {
      // for every pokemon the user owns
      for (const pokemonName of pokemons) {
        const newPokemon: Pokemon = {
          name: pokemonName,
          url: "",
        }
        // insert pokemon-object into the list of pokemons that will be displayed
        this.cataloguePokemon.push(newPokemon)
        // stop at the specified pageLength
      }
    }
    
      
      
      

    // Next time this function is triggered, load the next specified number of pokemons
    
    /* this.pokemonService.fetch(this.pageLength, this.offset)
    .subscribe(data => this.cataloguePokemon.push(...data))
    this.offset += this.pageLength
    console.log(this.offset); */
  }
}
