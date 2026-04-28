import { mount, unmount } from 'svelte';
import Dialog from './Dialog.svelte'

function createDialog(props) {
  if (typeof props === 'string') props = { message: props }

  let unmounted = false
  const teardown = () => {
    if (unmounted) return
    unmounted = true
    // `outro: true` lets the dialog's transition finish before the
    // component's anchors are removed.
    unmount(dialog, { outro: true })
  }

  const dialog = mount(Dialog, {
    target: document.body,
    props: {
      ...props,
      // Don't let Dialog re-parent its root element — it's already mounted
      // at document.body and the move would orphan it from Svelte's
      // tracked range, so unmount() couldn't remove it.
      appendToBody: false,
      ondestroy: teardown,
    },
    intro: true,
    // Legacy event name kept for backwards compatibility with consumers
    // still listening via `events:`.
    events: {
      destroy: teardown,
    },
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