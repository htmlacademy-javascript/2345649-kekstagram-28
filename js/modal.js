import { onEscKeyDown } from './utils/misc.js';

const Modals = {
  success: getModalElement('success'),
  error: getModalElement('error')
};

let activeModalType = null;
let globalEscKeydownCallback = null;

const onOuterBodyClick = (evt) => {
  if (!evt.target.closest(`.${activeModalType}__inner`)) {
    closeActiveModal();
  }
};

const onModalEscKeydown = (evt) => onEscKeyDown(evt, closeActiveModal);

const showModal = (type) => {
  activeModalType = type;
  document.addEventListener('click', onOuterBodyClick);
  document.addEventListener('keydown', onModalEscKeydown);
  document.body.append(Modals[activeModalType]);
};

function closeActiveModal() {
  Modals[activeModalType].remove();
  activeModalType = null;
  document.removeEventListener('click', onOuterBodyClick);
  document.removeEventListener('keydown', onModalEscKeydown);
  document.addEventListener('keydown', globalEscKeydownCallback);
}

function getModalElement(type) {
  const template = document.querySelector(`#${type}`).content;
  const modalElement = template.querySelector(`.${type}`).cloneNode(true);

  modalElement.querySelector(`.${type}__button`).addEventListener('click', closeActiveModal);

  return modalElement;
}

export const showSuccessModal = () => showModal('success');
export const showErrorModal = (escKeydownCallback) => {
  globalEscKeydownCallback = escKeydownCallback;
  showModal('error');
};
