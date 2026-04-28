import { mount, unmount } from 'svelte';
import Notification from './Notification.svelte'
import NotificationNotice from './NotificationNotice.svelte'

Notification.create = create

export default Notification

export function create(props) {
  if (typeof props === 'string') props = { message: props }

  let unmounted = false
  const teardown = () => {
    if (unmounted) return
    unmounted = true
    unmount(notification)
  }

  const notification = mount(NotificationNotice, {
    target: document.body,
    // `ondestroyed` is a callback prop forwarded to the inner <Notice>;
    // Svelte 5's `events:` option only catches DOM events, not
    // createEventDispatcher events, so a prop is required for cleanup.
    props: { ...props, ondestroyed: teardown },
    intro: true,
  })

  return notification
}
