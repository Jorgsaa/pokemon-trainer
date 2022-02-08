import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, map, mergeMap, Observable, of } from 'rxjs';
import { Pokemon, PokemonDetails } from '../models';
import { Response } from '../models/response.model';

const URL = 'https://pokeapi.co/api/v2/pokemon';
const POKEMON_DATA_KEY = 'pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  /**
   * Fetches Pokémon from the PokéAPI \
   * May be limited by using the `limit` parameter
   * @param limit Amount to fetch
   * @param offset Which id to start fetching from (null indexed)
   * @returns An observable list of Pokémon
   */
  fetch(limit: number = 20, offset: number = 0): Observable<Pokemon[]> {
    const sessionPokemon = this.fetchSession();

    if (sessionPokemon.length >= offset + limit)
      return of(sessionPokemon.slice(offset, offset + limit));

    const fetchedPokemon = this.http
      .get(`${URL}/?limit=${limit}&offset=${offset}`, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      })
      .pipe(
        map((response) => response as Response<Pokemon[]>),
        map((pokemonResponse) => pokemonResponse.results)
      );

    fetchedPokemon.subscribe({
      next: (pokemon) => {
        sessionStorage.setItem(
          POKEMON_DATA_KEY,
          JSON.stringify([...sessionPokemon, ...pokemon])
        );
      },
    });

    return fetchedPokemon;
  }

  /**
   * Fetches Pokémon stored in the session storage
   * @returns A list of Pokémon
   */
  fetchSession(): Pokemon[] {
    const pokemonData = sessionStorage.getItem(POKEMON_DATA_KEY);

    return JSON.parse(pokemonData ?? '[]');
  }

  /**
   * Fetches a detailed description of a Pokémon
   * @param name Name of the Pokémon
   * @returns Pokemon with its details
   */
  fetchDetails(name: string): Observable<PokemonDetails> {
    return this.http
      .get(`${URL}/${name}`)
      .pipe(map((response) => response as PokemonDetails));
  }
}
