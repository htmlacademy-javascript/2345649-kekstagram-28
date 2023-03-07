import { showBigPicture } from './big-picture.js';

const thumbnailClickHandlerGenerator = (photos) => (evt) => {
  evt.preventDefault();
  const photoId = evt.target.parentNode.dataset.photoId;
  showBigPicture(photos.find((photo) => photo.id === parseInt(photoId, 10)));
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
  const onThumbnailClick = thumbnailClickHandlerGenerator(photos);

  for (const photo of photos) {
    const thumbnail = createThumbnail(templateContent, photo);
    thumbnail.addEventListener('click', onThumbnailClick);
    fragment.append(thumbnail);
  }

  const picturesContainer = document.querySelector('.pictures');
  picturesContainer.append(fragment);
};
