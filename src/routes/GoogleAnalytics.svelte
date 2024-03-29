<script lang="ts">
  import { page } from '$app/stores'
</script>

{#if $page.url.host !== 'localhost'}
  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=G-SR1NCE4S63"
  ></script>
  <script>
    window.dataLayer = window.dataLayer || []
    function gtag() {
      dataLayer.push(arguments)
    }
    gtag('js', new Date())

    gtag('config', 'G-SR1NCE4S63')
  </script>
{/if}
