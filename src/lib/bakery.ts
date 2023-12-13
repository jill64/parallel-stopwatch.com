import { bakery } from 'svelte-baked-cookie'
import { integer } from 'svelte-baked-cookie/serde'

export const { bake, rebake } = bakery({
  allTime: integer
})
