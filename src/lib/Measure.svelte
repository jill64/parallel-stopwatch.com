<script lang="ts">
  import { download } from '@jill64/downloads-local'
  import { InlineModal } from '@jill64/svelte-inline-modal'
  import { unparse } from 'papaparse'
  import { slide } from 'svelte/transition'
  import { localAllTime } from './localAllTime'
  import { localRecords } from './localRecords'
  import { makeID } from './makeID'
  import { makeTimeString } from './makeTimeString'
  import { now } from './now'
  import { translate } from './translate'

  let input: HTMLInputElement | undefined
  let startTime = 0
  let diffTime = 0
  let allTime = localAllTime.get()
  let counting = false
  let records = localRecords.get()
  let started = false

  $: time = allTime + diffTime

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
<h1 class="text-7xl sm:text-9xl flex justify-center m-10">
  {makeTimeString(time)}
</h1>
<div class="flex justify-center items-center gap-4 text-6xl select-none">
  {#if counting}
    <button
      on:click={() => {
        allTime += now() - startTime
        localAllTime.set(allTime)
        diffTime = 0
        counting = false
      }}
    >
      □
    </button>
  {:else}
    <button
      on:click={() => {
        startTime = now()
        counting = true
        started = true
      }}
    >
      ▷
    </button>
    {#if time}
      <button
        on:click={() => {
          allTime = 0
          localAllTime.set(0)
          records = records.map((x) => ({ ...x, laps: [] }))
          counting = false
        }}
      >
        ↺
      </button>
    {/if}
  {/if}
</div>
<div
  class="grid sm:cols-auto-2 px-8 place-items-center sm:justify-start sm:w-[90vw] gap-4"
>
  <InlineModal let:open>
    <button
      class="text-lg push-effect dark:pop-effect rounded-full border border-gray-500 px-6 py-2 select-none"
      on:click={() => {
        open()
        setTimeout(() => input?.select(), 10)
      }}
    >
      {$translate({
        en: 'Export as CSV',
        ja: 'CSVとしてエクスポート'
      })}
    </button>
    <div
      class="flex flex-col gap-4 rounded-lg p-6 bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(50,50,52,0.8)] backdrop-blur shadow"
      slot="menu"
    >
      <div>
        <input
          bind:this={input}
          value="records-{new Date().toISOString().slice(0, 10)}"
          class="w-[50vw] bg-inherit sm:w-96 focus-under border-gray-500 text-2xl"
        />
        .csv
      </div>
      <button
        on:click={() => {
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
        {$translate({
          en: 'Export',
          ja: 'エクスポート'
        })}
      </button>
    </div>
  </InlineModal>
  <div />
  {#each records as record, index (record.id)}
    {@const laps = record.laps}
    <div class="flex items-center gap-4" transition:slide>
      <button
        class="text-xl w-7 h-7 rounded-full push-effect dark:pop-effect select-none"
        on:click={() => {
          records = [...records.slice(0, index), ...records.slice(index + 1)]
          localRecords.set(records)
        }}
      >
        ✕
      </button>
      <input
        bind:value={record.name}
        class="border-gray-500 focus-under bg-inherit text-2xl"
      />
      <span class="w-10 h-10">
        {#if counting}
          <button
            class="text-3xl select-none"
            on:click={() => {
              record.laps = [...record.laps, time]
              localRecords.set(records)
            }}
          >
            🏳
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
    class="text-5xl w-14 h-14 rounded-full select-none push-effect dark:pop-effect"
    on:click={() => {
      records = [
        ...records,
        {
          id: makeID(),
          name: `Record ${records.length + 1}`,
          laps: []
        }
      ]
      localRecords.set(records)
    }}
  >
    +
  </button>
</div>
