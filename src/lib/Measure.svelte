<script lang="ts">
  import { download } from '@jill64/downloads-local'
  import { FlipButton, InlineModal } from '@jill64/svelte-suite'
  import {
    FlagIcon,
    PlayIcon,
    PlusIcon,
    RotateCcwIcon,
    SquareIcon,
    XIcon
  } from '@jill64/svelte-suite/icons'
  import papaparse from 'papaparse'
  import type { Writable } from 'svelte/store'
  import { slide } from 'svelte/transition'
  import { i } from './i18n'
  import { localStorage } from './localStorage'
  import { makeID } from './makeID'
  import { makeTimeString } from './makeTimeString'
  import { now } from './now'

  const { unparse } = papaparse

  let {
    allTime
  }: {
    allTime: Writable<number>
  } = $props()

  let input: HTMLInputElement | undefined
  let startTime = $state(0)
  let diffTime = $state(0)
  let counting = $state(false)
  let records = $state(localStorage.records)
  let started = $state(false)

  let time = $derived($allTime + diffTime)

  setInterval(() => {
    if (counting) {
      diffTime = now() - startTime
    }
  }, 33)
</script>

<svelte:head>
  <title>
    {started ? `${makeTimeString(time, { hideMs: true })} - ` : ''}Parallel
    Stopwatch
  </title>
</svelte:head>

<header class="fixed top-1 right-1">
  <FlipButton />
</header>

<h1
  class="text-7xl sm:text-9xl flex justify-center m-10"
  aria-label={i.translate({
    en: 'Time',
    ja: 'タイム'
  })}
>
  {makeTimeString(time)}
</h1>
<div class="flex justify-center items-center gap-4">
  {#if counting}
    <button
      class="rounded-full p-4 push-effect dark:pop-effect"
      onclick={() => {
        $allTime += now() - startTime
        diffTime = 0
        counting = false
      }}
      title={i.translate({
        en: 'Stop',
        ja: 'ストップ'
      })}
    >
      <SquareIcon size="48" />
    </button>
  {:else}
    <button
      class="rounded-full p-4 push-effect dark:pop-effect"
      onclick={() => {
        startTime = now()
        counting = true
        started = true
      }}
      title={i.translate({
        en: 'Start',
        ja: 'スタート'
      })}
    >
      <PlayIcon size="48" />
    </button>
    {#if time}
      <button
        class="rounded-full p-4 push-effect dark:pop-effect"
        onclick={() => {
          $allTime = 0
          records = records.map((x) => ({ ...x, laps: [] }))
          counting = false
        }}
        title={i.translate({
          en: 'Reset',
          ja: 'リセット'
        })}
      >
        <RotateCcwIcon size="48" />
      </button>
    {/if}
  {/if}
</div>
<div
  class="grid sm:cols-auto-2 px-8 place-items-center sm:justify-start sm:w-[90vw] gap-4"
>
  <InlineModal>
    {#snippet button(open)}
      <button
        class="text-lg push-effect dark:pop-effect rounded-full border border-gray-500 px-6 py-2 select-none"
        onclick={() => {
          open()
          setTimeout(() => input?.select(), 10)
        }}
      >
        {i.translate({
          en: 'Export as CSV',
          ja: 'CSVとしてエクスポート'
        })}
      </button>
    {/snippet}
    {#snippet menu()}
      <div
        class="flex flex-col gap-4 rounded-lg p-6 bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(50,50,52,0.8)] backdrop-blur shadow"
      >
        <div>
          <input
            bind:this={input}
            title={i.translate({
              en: 'File name',
              ja: 'ファイル名'
            })}
            value="records-{new Date().toISOString().slice(0, 10)}"
            class="w-[50vw] bg-inherit sm:w-96 focus-under border-gray-500 text-2xl"
          />
          .csv
        </div>
        <button
          onclick={() => {
            const maxLap = records.length
              ? Math.max(...records.map((x) => x.laps.length))
              : 0

            const str = unparse(
              [
                records.map((x) => x.name),
                ...[...Array(maxLap)].map((_, index) =>
                  records.map((x) =>
                    makeTimeString(x.laps[index], { hideZero: true })
                  )
                )
              ],
              {
                quotes: true
              }
            )

            download(
              `${input?.value ?? ''}.csv`,
              new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), str], {
                type: 'text/csv'
              })
            )
          }}
          class="border push-effect dark:pop-effect border-gray-500 rounded-full py-2"
        >
          {i.translate({
            en: 'Export',
            ja: 'エクスポート'
          })}
        </button>
      </div>
    {/snippet}
  </InlineModal>
  <div></div>
  {#each records as record, index (record.id)}
    {@const laps = record.laps}
    <div class="flex items-center gap-4" transition:slide>
      <button
        class="rounded-full p-2 push-effect dark:pop-effect"
        onclick={() => {
          records = [...records.slice(0, index), ...records.slice(index + 1)]
          localStorage.records = records
        }}
        title={i.translate({
          en: `Delete ${record.name}`,
          ja: `${record.name} を削除`
        })}
      >
        <XIcon size="16" />
      </button>
      <input
        title={record.name}
        bind:value={record.name}
        class="border-gray-500 focus-under bg-inherit text-2xl"
      />
      <span class="w-10 h-10 flex items-center justify-center">
        {#if counting}
          <button
            class="rounded-full p-3 push-effect dark:pop-effect"
            onclick={() => {
              record.laps = [...record.laps, time]
              localStorage.records = records
            }}
            title={i.translate({
              en: `Add a lap to ${record.name}`,
              ja: `${record.name} にラップを追加`
            })}
          >
            <FlagIcon size="28" />
          </button>
        {/if}
      </span>
    </div>
    <div
      class="flex flex-col sm:flex-row sm:justify-self-start overflow-x-auto"
    >
      {#each laps as lap}
        <div Class="mr-10 text-2xl">
          {makeTimeString(lap)}
        </div>
      {/each}
    </div>
  {/each}
  <button
    class="rounded-full p-3 push-effect dark:pop-effect"
    onclick={() => {
      records = [
        ...records,
        {
          id: makeID(),
          name: `Record ${records.length + 1}`,
          laps: []
        }
      ]
      localStorage.records = records
    }}
    title={i.translate({
      en: 'Add a record',
      ja: '記録を追加'
    })}
  >
    <PlusIcon size="32" />
  </button>
</div>
