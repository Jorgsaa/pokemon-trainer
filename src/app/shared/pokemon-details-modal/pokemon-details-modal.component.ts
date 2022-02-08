import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Pokemon, PokemonDetails } from '../../models';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details-modal',
  templateUrl: './pokemon-details-modal.component.html',
  styleUrls: ['./pokemon-details-modal.component.css']
})
export class PokemonDetailsModalComponent implements OnInit {

  @Input() pokemon: Pokemon = { name: '', url: '' };

  @Output() onCloseClicked: EventEmitter<string> = new EventEmitter()

  public getTotal = (pokemon?: PokemonDetails) => pokemon?.stats.reduce((prev, stat) => prev + stat.base_stat, 0)
  
  pokemonDetails?: PokemonDetails

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.fetchDetails(this.pokemon.name).subscribe({
      next: (details) => this.pokemonDetails = details
    })
  }



  

}
