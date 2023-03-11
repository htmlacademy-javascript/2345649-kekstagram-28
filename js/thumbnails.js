import { showBigPicture } from './big-picture.js';

const getThumbnailClickHandler = (photos) => (evt) => {
  if (evt.target.matches('img')) {
    evt.preventDefault();
    const photoId = evt.target.parentNode.dataset.photoId;
    showBigPicture(photos.find((photo) => photo.id === parseInt(photoId, 10)));
  }
};

const createThumbnail = (template, photo) => {
  const thumbnailElement = template.querySelector('.picture').cloneNode(true);
  thumbnailElement.querySelector('.picture__img').src = photo.url;
  thumbnailElement.querySelector('.picture__likes').textContent = photo.likes;
  thumbnailElement.querySelector('.picture__comments').textContent =
    photo.comments.length;
  thumbnailElement.dataset.photoId = photo.id;
  return thumbnailElement;
};

export const createThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();
  const templateContent = document.querySelector('#picture').content;
  for (const photo of photos) {
    const thumbnail = createThumbnail(templateContent, photo);
    fragment.append(thumbnail);
  }

  const picturesContainer = document.querySelector('.pictures');
  const onThumbnailClick = getThumbnailClickHandler(photos);
  picturesContainer.addEventListener('click', onThumbnailClick);
  picturesContainer.append(fragment);
};
