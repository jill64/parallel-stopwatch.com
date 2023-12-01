import { storage } from '@jill64/svelte-suite'
import { integer } from '@jill64/svelte-suite/serde'

export const localAllTime = storage('allTime', integer)
