import { Component, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon, PokemonDetails } from 'src/app/models';
import { PokemonService } from 'src/app/services/pokemon.service';
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

  hasObtained: boolean = true;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonDetails$ = this.pokemonService.fetchDetails(this.pokemon.name);
  }
}
