import { mount, unmount } from 'svelte';
import Snackbar from './Snackbar.svelte'

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

  const snackbar = mount(Snackbar, {
    target: document.body,
    props: { ...props, ondestroyed: teardown },
    intro: true,
  });

  return snackbar;
}