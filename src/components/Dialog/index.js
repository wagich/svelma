import { mount, unmount } from 'svelte';
import Dialog from './Dialog.svelte'

function createDialog(props) {
  if (typeof props === 'string') props = { message: props }

  const dialog = mount(Dialog, {
    target: document.body,
    props,
    intro: true,
    events: {
      destroy: () => unmount(dialog),
    }
  });

  return dialog.promise
}

export function alert(props) {
  return createDialog(props);
}

export function confirm(props) {
  if (typeof props === 'string') props = { message: props }

  return createDialog({ showCancel: true, ...props });
}

export function prompt(props) {
  if (typeof props === 'string') props = { message: props }

  return createDialog({ hasInput: true, confirmText: 'Done', ...props });
}

Dialog.alert = alert
Dialog.confirm = confirm
Dialog.prompt = prompt

export default Dialog