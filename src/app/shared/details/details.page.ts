import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon, PokemonDetails } from '../../models';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.css']
})
export class DetailsPage implements OnInit {

  @Input() pokemon: Pokemon = { name: 'mewtwo', url: 'https://pokeapi.co/api/v2/pokemon/mewtwo' };

  public getTotal = (pokemon?: PokemonDetails) => pokemon?.stats.reduce((prev, stat) => prev + stat.base_stat, 0)
  
  pokemonDetails?: PokemonDetails

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.fetchDetails(this.pokemon.name).subscribe({
      next: (details) => this.pokemonDetails = details
    })
  }

  

}
