import { mount, unmount } from 'svelte';
import Notification from './Notification.svelte'
import NotificationNotice from './NotificationNotice.svelte'
import { getNoticesContainer } from '../Notices'

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

  const position = props.position ?? 'is-top-right'
  const target = getNoticesContainer(position)
  // Mount before the existing first child so the newest notice is at
  // the start of the DOM (matching the previous `insertAdjacentElement`
  // 'afterbegin' behavior the column / column-reverse layout relies on).
  const anchor = target.firstChild || undefined

  const notification = mount(NotificationNotice, {
    target,
    anchor,
    props: { ...props, position, ondestroyed: teardown },
    intro: true,
  })

  return notification
}
