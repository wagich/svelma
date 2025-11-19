import { mount, unmount } from 'svelte';
import Notification from './Notification.svelte'
import NotificationNotice from './NotificationNotice.svelte'

Notification.create = create

export default Notification

export function create(props) {
  if (typeof props === 'string') props = { message: props }

  const notification = mount(NotificationNotice, {
    target: document.body,
    props,
    intro: true,
    events: {
      destroyed: () => unmount(notification),
    }
  })

  return notification
}
