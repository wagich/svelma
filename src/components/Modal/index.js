import { mount, unmount } from 'svelte';
import Modal from './Modal.svelte'
import ModalCard from './ModalCard.svelte'

Modal.open = open
ModalCard.open = open

export default Modal
export { ModalCard }

export function open(props) {
  let unmounted = false
  const close = () => {
    if (unmounted) return
    unmounted = true
    unmount(modal, { outro: true })
  }

  const modal = mount(Modal, {
    target: document.body,
    // `onBody: false` — already mounted at <body>; re-parenting would
    // orphan the root from Svelte's tracked range and break unmount().
    props: { ...props, onBody: false },
    intro: true
  });

  modal.close = close;

  return modal;
}