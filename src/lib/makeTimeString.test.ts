import { expect, test } from 'bun:test'
import { makeTimeString } from './makeTimeString'

test('default', () => {
  expect(makeTimeString(0)).toBe('00:00.00')
  expect(makeTimeString(60000)).toBe('01:00.00')
  expect(makeTimeString(3599999)).toBe('59:59.99')
  expect(makeTimeString(3600000)).toBe('1:00:00.00')
  expect(makeTimeString(3600010)).toBe('1:00:00.01')
})

test('hide ms', () => {
  expect(
    makeTimeString(0, {
      hideMs: true
    })
  ).toBe('00:00')

  expect(
    makeTimeString(60000, {
      hideMs: true
    })
  ).toBe('01:00')

  expect(
    makeTimeString(3599999, {
      hideMs: true
    })
  ).toBe('59:59')

  expect(
    makeTimeString(3600000, {
      hideMs: true
    })
  ).toBe('1:00:00')

  expect(
    makeTimeString(3600010, {
      hideMs: true
    })
  ).toBe('1:00:00')
})

test('hide zero', () => {
  expect(
    makeTimeString(0, {
      hideZero: true
    })
  ).toBe('')

  expect(
    makeTimeString(60000, {
      hideZero: true
    })
  ).toBe('01:00.00')
})

test('hide both', () => {
  expect(
    makeTimeString(0, {
      hideZero: true,
      hideMs: true
    })
  ).toBe('')

  expect(
    makeTimeString(60000, {
      hideZero: true,
      hideMs: true
    })
  ).toBe('01:00')

  expect(
    makeTimeString(3599999, {
      hideMs: true
    })
  ).toBe('59:59')

  expect(
    makeTimeString(3600000, {
      hideMs: true
    })
  ).toBe('1:00:00')

  expect(
    makeTimeString(3600010, {
      hideMs: true
    })
  ).toBe('1:00:00')
})
