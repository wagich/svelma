<script context="module">
  const allowedProps = ['active', 'position', 'duration'];

  export function filterProps(props) {
    const newProps = {}

    Object.keys(props).forEach(key => {
      if (allowedProps.includes(key)) newProps[key] = props[key]
    })

    return newProps
  }
</script>

<script>
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import { fly, fade } from 'svelte/transition'

  const dispatch = createEventDispatcher()

  export let active = true
  export let position = 'is-top'
  export let duration = 2000
  export let transitionOut = true

  /** Callback invoked once the notice has finished animating out and
   * is ready to be unmounted. Programmatic helpers use this to call
   * `unmount()`. (The legacy `destroyed` component event is still
   * dispatched for any consumers using `<Notice on:destroyed>`.)
   * */
  export let ondestroyed = null

  let timer

  $: transitionY = ~position.indexOf('is-top') ? -200 : 200

  export function close() {
    active = false
  }

  function remove() {
    clearTimeout(timer)

    // Just making sure
    active = false

    dispatch('destroyed')
    ondestroyed?.()
  }

  onMount(() => {
    timer = setTimeout(() => {
      close()
    }, duration)
  })
</script>

<style lang="scss">
  .notice {
    display: inline-flex;
    pointer-events: auto;

    &.is-top,
    &.is-bottom {
      align-self: center;
    }

    &.is-top-left,
    &.is-bottom-left {
      align-self: flex-start;
    }

    &.is-top-right,
    &.is-bottom-right {
      align-self: flex-end;
    }
  }
</style>

{#if active}
  <div
    class="notice {position}"
    aria-hidden={!active}
    in:fly={{ y: transitionY }}
    out:fade={{ duration: transitionOut ? 400 : 0 }}
    on:outroend={remove}>

    <slot />
  </div>
{/if}
