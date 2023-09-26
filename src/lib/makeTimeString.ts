const ignoreNaN = (x: number) => (isNaN(x) ? 0 : x)

const format2digits = (num: number) =>
  ignoreNaN(Math.floor(num)).toString().padStart(2, '0')

export const makeTimeString = (
  time: number,
  options?: {
    hideMs?: boolean
    hideZero?: boolean
  }
) => {
  const { hideMs, hideZero } = options ?? {}

  const t = ignoreNaN(time)

  if (hideZero && t === 0) {
    return ''
  }

  const hour = t >= 3600000 ? `${ignoreNaN(Math.floor(t / 3600000))}:` : ''
  const min = format2digits((t / 60000) % 60)
  const sec = format2digits((t / 1000) % 60)
  const ms = hideMs ? '' : `.${format2digits((t / 10) % 100)}`

  return `${hour}${min}:${sec}${ms}`
}
