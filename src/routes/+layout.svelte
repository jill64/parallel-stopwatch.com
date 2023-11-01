<script lang="ts">
  import { base } from '$app/paths'
  import { page } from '$app/stores'
  import { translate } from '$lib/i18n'
  import { isDark } from '@jill64/svelte-device-theme'
  import { LocaleAlternates, LanguageManager } from '@jill64/svelte-i18n'
  import { Toaster } from '@jill64/svelte-toast'
  import '../app.postcss'

  $: title = $translate({
    en: 'Parallel Stopwatch',
    ja: 'パラレルストップウォッチ'
  })

  $: description = $translate({
    en: 'Simultaneously start any number of stopwatches and record them individually.\nYou can output the result as a csv file.',
    ja: '複数のストップウォッチを同時にスタートさせ、個別に記録します。\n結果はcsvファイルで出力することができます。'
  })

  $: suffix = $isDark ? '-dark' : ''

  $: ({
    url: { href, origin }
  } = $page)
</script>

<Toaster position="bottom-right" />
<LanguageManager />
<LocaleAlternates xDefaultHref={origin} />
<svelte:head>
  <link rel="icon" href="{base}/favicon{suffix}.png" />
  <link rel="icon" href="{base}/favicon{suffix}.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="{base}/apple-touch-icon{suffix}.png" />
  <meta name="description" content={description} />
  <meta property="og:url" content={href} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:site_name" content={title} />
</svelte:head>
<slot />
