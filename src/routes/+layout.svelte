<script lang="ts">
  import { base } from '$app/paths'
  import { page } from '$app/stores'
  import Measure from '$lib/Measure.svelte'
  import { translate } from '$lib/i18n'
  import {
    LanguageManager,
    LocaleAlternates,
    OGP,
    ThemeManager,
    Toaster,
    theme
  } from '@jill64/svelte-suite'
  import GoogleAnalytics from './GoogleAnalytics.svelte'
  import '../app.postcss'

  export let data

  $: title = $translate({
    en: 'Parallel Stopwatch',
    ja: 'パラレルストップウォッチ'
  })

  $: description = $translate({
    en: 'Simultaneously start any number of stopwatches and record them individually.\nYou can output the result as a csv file.',
    ja: '複数のストップウォッチを同時にスタートさせ、個別に記録します。\n結果はcsvファイルで出力することができます。'
  })

  $: suffix = $theme === 'dark' ? '-dark' : ''
</script>

<Toaster position="bottom-right" />
<LanguageManager />
<ThemeManager />
<LocaleAlternates xDefaultHref={$page.url.origin} />
<OGP
  {title}
  {description}
  site_name={title}
  image="https://parallel-stopwatch.com/og-image.png"
/>
<svelte:head>
  <link rel="icon" href="{base}/favicon{suffix}.png" />
  <link rel="icon" href="{base}/favicon{suffix}.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="{base}/apple-touch-icon{suffix}.png" />
  <meta name="description" content={description} />
  <GoogleAnalytics />
</svelte:head>

<Measure allTime={data.allTime} />
