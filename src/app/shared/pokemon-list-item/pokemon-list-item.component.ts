import { Component, Input, OnInit, Output } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Pokemon, PokemonDetails } from 'src/app/models';
import { PokemonService } from 'src/app/services/pokemon.service';
import { EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/users.service';
import { UserLoggedInService } from 'src/app/services/user-logged-in.service';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css'],
})
export class PokemonListItemComponent implements OnInit {
  @Input() pokemon: Pokemon = { name: '', url: '' };

  @Output() onInfoClicked: EventEmitter<Pokemon> = new EventEmitter();

  pokemonDetails$: Observable<PokemonDetails> = of();

  hasObtained$: Observable<boolean> = of(false);

  constructor(
    private readonly pokemonService: PokemonService,
    private readonly userService: UserService,
    private readonly userLoggedInService: UserLoggedInService
  ) {}

  ngOnInit(): void {
    this.pokemonDetails$ = this.pokemonService.fetchDetails(this.pokemon.name);
    this.hasObtained$ = this.userService
      .fetchUser('ash')
      .pipe(map((user) => user?.pokemon.includes(this.pokemon.name) ?? false));
  }
}
