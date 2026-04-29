import { mount, flushSync } from 'svelte'
import Notices from './Notices.svelte'
import Notice, { filterProps } from './Notice.svelte'

export { Notice, Notices, filterProps }

// Singleton container elements per region, lazily mounted on first use.
const containers = {}

function pickKey(position) {
  return position && position.indexOf('is-bottom') === 0 ? 'bottom' : 'top'
}

/**
 * Ensure the appropriate <Notices> region exists for the given position
 * and return its DOM container element. Programmatic helpers
 * (Toast/Snackbar/Notification) mount their notice components directly
 * into this element, avoiding any post-mount DOM reparenting.
 *
 * @param {string} [position] - e.g. `is-top`, `is-bottom-right`, etc.
 * @returns {HTMLElement} The notices region's container element.
 */
export function getNoticesContainer(position) {
  const key = pickKey(position)
  if (!containers[key]) {
    let el
    // `mount()` schedules effects but does not run them synchronously.
    // `flushSync` forces the reactive `oncontainer` callback in
    // Notices.svelte to fire before we read `el`.
    flushSync(() => {
      mount(Notices, {
        target: document.body,
        props: {
          position: key,
          oncontainer: (node) => { el = node },
        },
      })
    })
    containers[key] = el
  }
  return containers[key]
}

