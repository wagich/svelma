import { mount, unmount } from 'svelte';
import Toast from './Toast.svelte'
import { getNoticesContainer } from '../Notices'

Toast.create = create

export default Toast

export function create(props) {
  if (typeof props === 'string') props = { message: props }

  let unmounted = false
  const teardown = () => {
    if (unmounted) return
    unmounted = true
    unmount(toast)
  }

  const position = props.position ?? 'is-top'
  const target = getNoticesContainer(position)
  const anchor = target.firstChild || undefined

  const toast = mount(Toast, {
    target,
    anchor,
    props: { ...props, position, ondestroyed: teardown },
    intro: true,
  });

  return toast;
}