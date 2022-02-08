import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/models';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  @Input() pokemon: Pokemon[] = []

  @Input() distance: number = 0

  @Input() throttle: number = 0

  @Output() onScroll: EventEmitter<void> = new EventEmitter()

  @Output() onItemInfoClicked: EventEmitter<Pokemon> = new EventEmitter()

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
  }




}
