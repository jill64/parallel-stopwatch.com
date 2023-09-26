import { typedStorage } from '@jill64/typed-storage'

export const localAllTime = typedStorage('allTime', {
  guard: (x): x is number => typeof x === 'number',
  defaultValue: 0,
  serializer: {
    parse: (x) => parseInt(x),
    stringify: (x) => x.toString()
  }
})
