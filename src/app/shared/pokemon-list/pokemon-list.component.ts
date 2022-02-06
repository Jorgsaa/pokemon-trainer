import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon } from 'src/app/models';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemon$: Observable<Pokemon[]> = of()

  offset: number = 0

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadMore()
  }

  loadMore(): void {
    this.pokemon$ = this.pokemonService.fetch(20, this.offset)
    this.pokemon$.subscribe({
      next: console.log
    })
    this.offset += 20
  }

}
