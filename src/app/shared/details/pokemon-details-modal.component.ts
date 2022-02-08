import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon, PokemonDetails } from '../../models';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details-modal',
  templateUrl: './pokemon-details-modal.component.html',
  styleUrls: ['./pokemon-details-modal.component.css']
})
export class PokemonDetailsModalComponent implements OnInit {

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
