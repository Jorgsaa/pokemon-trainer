import { Component, Input, OnInit } from '@angular/core';
import { debounceTime, Observable, of } from 'rxjs';
import { Pokemon } from 'src/app/models';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  @Input() pageLength: number = 20

  pokemon: Pokemon[] = []

  offset: number = 0

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.offset = 0
    this.loadMore()
  }

  loadMore(): void {
    this.pokemonService.fetch(this.pageLength, this.offset)
    .subscribe(data => this.pokemon.push(...data))
    this.offset += this.pageLength
  }

}
