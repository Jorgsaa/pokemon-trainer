import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css'],
})
export class PokemonListItemComponent implements OnInit {
  @Input() pokemon: Pokemon = {
    name: 'Ditto',
    id: 132,
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png',
    },
    abilities: [],
    stats: [],
    types: [],
  };

  hasObtained: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
