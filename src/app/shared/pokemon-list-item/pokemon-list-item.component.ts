import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon, PokemonDetails } from 'src/app/models';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css'],
})
export class PokemonListItemComponent implements OnInit {
  @Input() pokemon: Pokemon = { name: '', url: '' };

  pokemonDetails$: Observable<PokemonDetails> = of();

  hasObtained: boolean = true;

  constructor(private pokemonService: PokemonService) {}

  public handleCatchClicked(pokemonName: string): void {
    console.log(pokemonName);
  }

  ngOnInit(): void {
    this.pokemonDetails$ = this.pokemonService.fetchDetails(this.pokemon.name);
  }
}
