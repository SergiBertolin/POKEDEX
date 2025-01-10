import { z } from 'zod'
import { PokemonsAPIResponseSchema, PokemonsAPIDetailsSchema, TiposAPIResponseSchema, SearchPokemonSchema, SearchTipoSchema, MovesAPIResponseSchema, MovesAPIDetailsSchema } from '../utils/pokemons-schema'

export type Pokemons = z.infer<typeof PokemonsAPIResponseSchema>["results"][number]
export type PokemonDetails = z.infer<typeof PokemonsAPIDetailsSchema>
export type Tipos = z.infer<typeof TiposAPIResponseSchema>
export type Pokemon = z.infer<typeof SearchPokemonSchema>
export type Tipo = z.infer<typeof SearchTipoSchema>
export type Moves = z.infer<typeof MovesAPIResponseSchema>["results"][number]
export type MovesDetails = z.infer<typeof MovesAPIDetailsSchema>