import { mount, unmount } from 'svelte';
import Modal from './Modal.svelte'
import ModalCard from './ModalCard.svelte'

Modal.open = open
ModalCard.open = open

export default Modal
export { ModalCard }

export function open(props) {
  const modal = mount(Modal, {
    target: document.body,
    props,
    intro: true
  });

  modal.close = () => unmount(modal);

  return modal;
}