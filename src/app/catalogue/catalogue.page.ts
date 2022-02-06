import { Component, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from '../models';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.css']
})
export class CataloguePage implements OnInit {

  @Input() pageLength: number = 50

  @Output() cataloguePokemon: Pokemon[] = []
  
  offset: number = 0
  
  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.offset = 0
    this.loadMore()
  }

  loadMore(): void {
    this.pokemonService.fetch(this.pageLength, this.offset)
    .subscribe(data => this.cataloguePokemon.push(...data))
    this.offset += this.pageLength
  }
}
