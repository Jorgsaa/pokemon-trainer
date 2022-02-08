import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon, PokemonDetails } from 'src/app/models';
import { PokemonService } from 'src/app/services/pokemon.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css'],
})
export class PokemonListItemComponent implements OnInit {
  @Input() pokemon: Pokemon = { name: '', url: '' };

  pokemonDetails$: Observable<PokemonDetails> = of();

  hasObtained: boolean = true;

  constructor(
    private pokemonService: PokemonService,
    private userService: UserService
    ) {}

  public handleCatchClicked(pokemonName: string): void {
    console.log(pokemonName);
    this.hasObtained = false;
    this.userService.catchPokemon(pokemonName)
  }

  ngOnInit(): void {
    this.pokemonDetails$ = this.pokemonService.fetchDetails(this.pokemon.name);
  }
}
