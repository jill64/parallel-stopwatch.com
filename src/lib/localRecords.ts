import { storage } from '@jill64/svelte-suite'
import { json } from '@jill64/svelte-suite/serde'
import { array, number, scanner, string } from 'typescanner'
import { makeID } from './makeID'
import type { RecordData } from './type/RecordData'

const isRecordData = scanner<RecordData>({
  id: string,
  name: string,
  laps: array(number)
})

export const localRecords = storage(
  'records',
  json(
    (x): x is RecordData[] => Array.isArray(x) && x.every(isRecordData),
    [{ id: makeID(), name: 'Record 1', laps: [] }]
  )
)
