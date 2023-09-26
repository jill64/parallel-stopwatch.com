import { typedStorage } from '@jill64/typed-storage'
import { array, number, scanner, string } from 'typescanner'
import { makeID } from './makeID'
import type { RecordData } from './type/RecordData'

const isRecordData = scanner<RecordData>({
  id: string,
  name: string,
  laps: array(number)
})

export const localRecords = typedStorage('records', {
  guard: (x): x is RecordData[] => Array.isArray(x) && x.every(isRecordData),
  defaultValue: [{ id: makeID(), name: 'Record 1', laps: [] }]
})
