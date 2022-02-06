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

  pokemon$: Observable<Pokemon[]> = of([])

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemon$ = this.pokemonService.fetch()
  }

}
