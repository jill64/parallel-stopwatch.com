import { rebake } from '$lib/bakery.js'

export const load = ({ data: { pie } }) => {
  const cookie = rebake(pie)

  return {
    cookie
  }
}
