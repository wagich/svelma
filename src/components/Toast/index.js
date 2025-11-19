import { mount, unmount } from 'svelte';
import Toast from './Toast.svelte'

Toast.create = create

export default Toast

export function create(props) {
  if (typeof props === 'string') props = { message: props }

  const toast = mount(Toast, {
    target: document.body,
    props,
    intro: true,
    events: {
      destroyed: () => unmount(toast),
    }
  });

  return toast;
}