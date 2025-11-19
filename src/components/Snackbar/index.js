import { mount, unmount } from 'svelte';
import Snackbar from './Snackbar.svelte'

Snackbar.create = create

export default Snackbar

export function create(props) {
  if (typeof props === 'string') props = { message: props }

  const snackbar = mount(Snackbar, {
    target: document.body,
    props,
    intro: true,
    events: {
      destroyed: () => unmount(snackbar),
    }
  });

  return snackbar;
}