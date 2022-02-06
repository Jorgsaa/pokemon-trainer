import { Ability } from "./ability.model";
import { Stat } from "./stat.model";
import { Type } from "./type.model";

export interface PokemonDetails {
    name: string
    id: number
    sprites: {
        front_default: string
    }
    abilities: Array<{ ability: Ability, is_hidden: boolean, slot: number }>
    stats: Array<{ base_stat: number, effort: number, stat: Stat }>
    types: Array<{ slot: number, type: Type }>
}

export interface Pokemon {
    name: string
    url: string
}