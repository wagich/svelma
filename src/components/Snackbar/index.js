import { mount, unmount } from 'svelte';
import Snackbar from './Snackbar.svelte'
import { getNoticesContainer } from '../Notices'

Snackbar.create = create

export default Snackbar

export function create(props) {
  if (typeof props === 'string') props = { message: props }

  let unmounted = false
  const teardown = () => {
    if (unmounted) return
    unmounted = true
    unmount(snackbar)
  }

  const position = props.position ?? 'is-bottom-right'
  const target = getNoticesContainer(position)
  const anchor = target.firstChild || undefined

  const snackbar = mount(Snackbar, {
    target,
    anchor,
    props: { ...props, position, ondestroyed: teardown },
    intro: true,
  });

  return snackbar;
}