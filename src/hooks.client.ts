import { PUBLIC_SENTRY_DSN } from '$env/static/public'
import { clientInit } from '@jill64/sentry-sveltekit-cloudflare'
import { toast } from '@jill64/svelte-toast'
import { get } from 'svelte/store'

const onError = clientInit(PUBLIC_SENTRY_DSN)

export const handleError = onError((e) => {
  if (e.error instanceof Error) {
    get(toast).error(e.error.message)
  }
})
