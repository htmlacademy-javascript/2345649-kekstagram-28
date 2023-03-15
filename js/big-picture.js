import { onEscKeyDown } from './utils/misc.js';

const bigPicture = document.querySelector('.big-picture');
const closeButtonElement = bigPicture.querySelector('.big-picture__cancel');
const commentsElement = bigPicture.querySelector('.social__comments');
const showMoreElement = bigPicture.querySelector('.comments-loader');
const liElement = commentsElement.querySelector('li');

const onCloseButtonClick = () => {
  closeBigPicture();
};

const getShowMoreClickHandler = (comments) => {
  let commentsShowed = 0;
  const totalComments = comments.length;
  return () => {
    const startComment = commentsShowed;
    const showCommentsCount = Math.min(totalComments, commentsShowed + 5);
    for (let i = startComment; i < showCommentsCount; i++) {
      const { avatar, name, message } = comments[i];
      const newComment = liElement.cloneNode(true);

      const picture = newComment.querySelector('.social__picture');
      picture.src = avatar;
      picture.alt = name;

      newComment.querySelector('.social__text').textContent = message;
      commentsElement.append(newComment);

      commentsShowed++;
    }
    bigPicture.querySelector('.social__comment-count').innerHTML =
      `${commentsShowed} из <span class="comments-count">${totalComments}</span> комментариев`;
    if (commentsShowed === totalComments) {
      showMoreElement.classList.add('hidden');
    }
  };
};

let onShowMoreClick = () => {};

const fillTemplate = (photo) => {
  showMoreElement.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  commentsElement.innerHTML = '';
  onShowMoreClick = getShowMoreClickHandler(photo.comments);
  onShowMoreClick();
};

const onModalEscKeydown = (evt) => onEscKeyDown(evt, closeBigPicture);

function closeBigPicture() {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  closeButtonElement.removeEventListener('click', onCloseButtonClick);
  showMoreElement.removeEventListener('click', onShowMoreClick);
  document.removeEventListener('keydown', onModalEscKeydown);
}

export const showBigPicture = (photo) => {
  fillTemplate(photo);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  showMoreElement.addEventListener('click', onShowMoreClick);
  closeButtonElement.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onModalEscKeydown);
};
