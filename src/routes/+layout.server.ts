import { bake } from '$lib/bakery.js'

export const load = ({ cookies }) => {
  const { pie } = bake(cookies)

  return {
    pie
  }
}
