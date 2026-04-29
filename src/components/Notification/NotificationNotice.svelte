<script>
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import { fly, fade } from 'svelte/transition'
  import { Notice, filterProps } from '../Notices'
  import Notification from './Notification.svelte'

  export let message
  export let duration = 2000
  export let position = 'is-top-right'

  /** @svelte-prop {Function} [ondestroyed] */
  export let ondestroyed = null

  $: props = { ...filterProps($$props), duration, position, ondestroyed }
  $: notificationProps = { ...removeNonNoficationProps($$props) }

  function removeNonNoficationProps(props) {
    const newProps = {}

    const blacklist = ['duration', 'message', 'position', 'ondestroyed']

    Object.keys(props).forEach(key => {
      if (!blacklist.includes(key)) newProps[key] = props[key]
    })

    return newProps
  }
</script>

<style>
:global(.notification) {
  margin: 0.5em 0;
}
</style>

<Notice {...props} transitionOut={true}>
  <Notification {...notificationProps}>
    {@html message}
  </Notification>
</Notice>
