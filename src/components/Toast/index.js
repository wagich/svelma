import { mount, unmount } from 'svelte';
import Toast from './Toast.svelte'

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

  const toast = mount(Toast, {
    target: document.body,
    props: { ...props, ondestroyed: teardown },
    intro: true,
  });

  return toast;
}