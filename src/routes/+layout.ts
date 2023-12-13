import { rebake } from '$lib/bakery.js'

export const load = ({ data: { pie } }) => {
  const { allTime } = rebake(pie)

  return {
    allTime
  }
}
