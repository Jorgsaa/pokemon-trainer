import { Component, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon, PokemonDetails } from 'src/app/models';
import { PokemonService } from 'src/app/services/pokemon.service';
import { UserService } from 'src/app/services/user.service';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css'],
})
export class PokemonListItemComponent implements OnInit {
  @Input() pokemon: Pokemon = { name: '', url: '' };

  @Output() onInfoClicked: EventEmitter<Pokemon> = new EventEmitter()

  pokemonDetails$: Observable<PokemonDetails> = of();

  hasObtained: boolean = false;

  constructor(
    private pokemonService: PokemonService,
    private userService: UserService
    ) {}

  public handleCatchClicked(pokemonName: string): void {
    this.hasObtained = false;
    this.userService.catchPokemon(pokemonName)
  }

  ngOnInit(): void {
    this.pokemonDetails$ = this.pokemonService.fetchDetails(this.pokemon.name);

    // The user should not be able to catch the same pokemon twice
    const pokemons = this.userService.getCurrentUserPokemons()
    if (pokemons) {
      for (const pokemon of pokemons) {
        if (pokemon === this.pokemon.name) {
          this.hasObtained = true;
        }
      }
    }
  }
}
