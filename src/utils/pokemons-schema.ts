import { z } from 'zod'

export const PokemonsAPIResponseSchema = z.object({
    results: z.array(
        z.object({
            name: z.string(),
            url: z.string(),
        })
    )
})

export const PokemonsAPIDetailsSchema = z.object({
    abilities: z.array(
        z.object({
            ability: z.object({
                    name: z.string()
                })
        })
    ),
    height: z.number(),
    id: z.number(),
    moves: z.array(
        z.object({
            move: z.object({
                name: z.string()
            })
        })
    ),
    name: z.string(),
    sprites: z.object({
                other: z.object({
                    home: z.object({
                        front_default: z.string()
                    })
                })
    }),
    stats: z.array(
        z.object({
            base_stat: z.number(),
            stat: z.object({
                name: z.string()
            })
        })
    ),
    types: z.array(
        z.object({
            type: z.object({
                name: z.string()
            })
        })
    ),
    weight: z.number()
})

export const TiposAPIResponseSchema = z.object({
    results: z.array(
        z.object({
            name: z.string(),
            url: z.string()
        })
    )
})

export const SearchPokemonSchema = z.object({
    pokemon: z.string()
})

export const SearchTipoSchema = z.object({
    tipo: z.string()
})

export const MovesAPIResponseSchema = z.object({
    results: z.array(
        z.object({
            name: z.string(),
            url: z.string(),
        })
    )
})

export const MovesAPIDetailsSchema = z.object({
    name: z.string(),
    id: z.number(),
    accuracy: z.number().nullable().optional(),  // Hacer `accuracy` opcional o permitir `null`
    damage_class: z.object({
        name: z.string(),
    }),
    effect_entries: z.array(
        z.object({
            effect: z.string(),
        })
    ).optional(),  // Hacer `effect_entries` opcional
    power: z.number().nullable().optional(),  // Hacer `power` opcional o permitir `null`
    pp: z.number(),
    type: z.object({
        name: z.string(),
    })
})