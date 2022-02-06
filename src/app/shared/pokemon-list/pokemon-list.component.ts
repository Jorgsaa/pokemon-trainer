import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon } from 'src/app/models';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  @Input() pageLength: number = 20

  pokemon$: Observable<Pokemon[]> = of()

  offset: number = 0

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadMore()
  }

  // TODO: append newly loaded pokemon to the previously loaded
  loadMore(): void {
    this.pokemon$ = this.pokemonService.fetch(this.pageLength, this.offset)
    this.pokemon$.subscribe({
      next: console.log
    })
    this.offset += this.pageLength
  }

}
