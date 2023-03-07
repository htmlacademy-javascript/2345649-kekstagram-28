const onThumbnailClick = (evt) => {
  evt.preventDefault();
};

const createThumbnail = (template, photo) => {
  const thumbnailElement = template.querySelector('.picture').cloneNode(true);
  thumbnailElement.querySelector('.picture__img').src = photo.url;
  thumbnailElement.querySelector('.picture__likes').textContent = photo.likes;
  thumbnailElement.querySelector('.picture__comments').textContent = photo.comments.length;
  return thumbnailElement;
};

export const createThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();
  const templateContent = document.querySelector('#picture').content;

  for (const photo of photos) {
    const thumbnail = createThumbnail(templateContent, photo);
    thumbnail.addEventListener('click', onThumbnailClick);
    fragment.append(thumbnail);
  }

  const picturesContainer = document.querySelector('.pictures');
  picturesContainer.append(fragment);
};

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');


const onCloseButtonClick = () => {
  closeBigPicture();
};

const onEscKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture() {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onEscKeyDown);
}

const fillComments = (photoComments) => {
  const comments = bigPicture.querySelector('.social__comments');
  const liElement = comments.querySelector('li');
  comments.innerHTML = '';
  for (const {avatar, name, message} of photoComments) {
    const newComment = liElement.cloneNode(true);
    const picture = newComment.querySelector('.social__picture');
    picture.src = avatar;
    picture.alt = name;
    newComment.querySelector('.social__text').textContent = message;
    comments.append(newComment);
  }
};

const fillTemplate = (photo) => {
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  fillComments(photo.comments);
};

export function showBigPicture(photo) {
  fillTemplate(photo);

  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  document.body.classList.add('modal-open');

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscKeyDown);
}


