import { showBigPicture } from './big-picture.js';
import { createUniqueRandomIdGenerator, debounce } from './utils/misc.js';

const picturesContainer = document.querySelector('.pictures');
const filterButtons = document.querySelectorAll('.img-filters__button');
let photos = [];

const getThumbnailClickHandler = () => (evt) => {
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

export const createThumbnails = (photoList) => {
  const fragment = document.createDocumentFragment();
  const templateContent = document.querySelector('#picture').content;
  for (const photo of photoList) {
    const thumbnail = createThumbnail(templateContent, photo);
    fragment.append(thumbnail);
  }

  picturesContainer.append(fragment);
};

const removeThumbnails = () => {
  document.querySelectorAll('a.picture').forEach((el) => el.remove());
};

const showDefaultPhotos = () => {
  removeThumbnails();
  createThumbnails(photos);
};

const showMostDiscussedPhotos = () => {
  removeThumbnails();
  createThumbnails(photos.slice().sort((a, b) => b.comments.length - a.comments.length));
};

const showRandomPhotos = () => {
  const getRandomPhotoId = createUniqueRandomIdGenerator(0, photos.length - 1);
  const currentPhotos = [];
  for (let i = 0; i < 10; i++) {
    currentPhotos.push(photos[getRandomPhotoId()]);
  }
  removeThumbnails();
  createThumbnails(currentPhotos);
};

const toggleActiveFilter = (target) => {
  filterButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
  target.classList.add('img-filters__button--active');
};

export const initThumbnails = (photoList) => {
  photos = photoList;
  const onThumbnailClick = getThumbnailClickHandler();
  picturesContainer.addEventListener('click', onThumbnailClick);

  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  filterButtons.forEach((button) => {
    button.addEventListener('click', (evt) => toggleActiveFilter(evt.target));
  });
  document.querySelector('#filter-default').addEventListener('click', debounce(showDefaultPhotos));
  document.querySelector('#filter-random').addEventListener('click', debounce(showRandomPhotos));
  document.querySelector('#filter-discussed').addEventListener('click', debounce(showMostDiscussedPhotos));

  showDefaultPhotos();
};
