const list = ['en', 'ja'] as const

export type Locale = (typeof list)[number]

export const match = (x: string): x is Locale =>
  (list as Readonly<string[]>).includes(x)

export const validated = (x: string): Locale => (match(x) ? x : 'en')

export const locale = {
  list,
  match,
  validated
}
