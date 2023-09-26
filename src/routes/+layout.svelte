<script lang="ts">
  import { page } from '$app/stores'
  import { PUBLIC_SENTRY_DSN } from '$env/static/public'
  import { locale, validated } from '$lib/enum/locale'
  import { translate } from '$lib/translate'
  import { isDark } from '@jill64/svelte-device-theme'
  import { Toaster } from '@jill64/svelte-toast'
  import * as Sentry from '@sentry/svelte'
  import '../app.postcss'
  import { base } from '$app/paths'

  Sentry.init({
    dsn: PUBLIC_SENTRY_DSN,
    integrations: [new Sentry.BrowserTracing()]
  })

  $: title = $translate({
    en: 'Parallel Stopwatch',
    ja: 'パラレルストップウォッチ'
  })

  $: description = $translate({
    en: 'Simultaneously start any number of stopwatches and record them individually.\nYou can output the result as a csv file.',
    ja: '複数のストップウォッチを同時にスタートさせ、個別に記録します。\n結果はcsvファイルで出力することができます。'
  })

  $: suffix = $isDark ? '-dark' : ''
</script>

<Toaster position="bottom-right" />
<svelte:head>
  {#each locale.list as lang}
    {#if lang !== validated($page.params.locale)}
      <link rel="alternate" hreflang={lang} href="{$page.url.origin}/{lang}" />
    {/if}
  {/each}
  <link rel="alternate" hreflang="x-default" href={$page.url.origin} />
  <link rel="icon" href="{base}/favicon{suffix}.png" />
  <link rel="icon" href="{base}/favicon{suffix}.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="{base}/apple-touch-icon{suffix}.png" />
  <meta name="description" content={description} />
  <meta property="og:url" content={$page.url.href} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:site_name" content={title} />
</svelte:head>
<slot />
