import { storage } from '@jill64/svelte-storage'
import { integer } from '@jill64/svelte-storage/serde'

export const localAllTime = storage('allTime', integer)
