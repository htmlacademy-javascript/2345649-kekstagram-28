import { createThumbnails } from './thumbnails.js';
import { configureUploadImageForm } from './form.js';
import { loadPhotos } from './api.js';
import { showAlert, createUniqueRandomIdGenerator, debounce } from './utils/misc.js';

let photos = [];

const removeThumbnails = () => {
  document.querySelectorAll('a.picture').forEach((el) => el.remove());
};

const showDefault = () => {
  removeThumbnails();
  createThumbnails(photos);
};

const showDiscussed = () => {
  removeThumbnails();
  createThumbnails(photos.slice().sort((a, b) => b.comments.length - a.comments.length));
};

const showRandom = () => {
  const getRandomPhotoId = createUniqueRandomIdGenerator(0, photos.length - 1);
  const currentPhotos = [];
  for (let i = 0; i < 10; i++) {
    currentPhotos.push(photos[getRandomPhotoId()]);
  }
  removeThumbnails();
  createThumbnails(currentPhotos);
};

loadPhotos()
  .then((data) => {
    photos = data;
    showDefault();
  })
  .catch((err) => showAlert(err.message));

const filterButtons = document.querySelectorAll('.img-filters__button');
const toggleActive = (target) => {
  filterButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
  target.classList.add('img-filters__button--active');
};

document.querySelector('.img-filters').classList.remove('img-filters--inactive');
filterButtons.forEach((button) => {
  button.addEventListener('click', (evt) => toggleActive(evt.target));
});


document.querySelector('#filter-default').addEventListener('click', debounce(showDefault));
document.querySelector('#filter-random').addEventListener('click', debounce(showRandom));
document.querySelector('#filter-discussed').addEventListener('click', debounce(showDiscussed));

configureUploadImageForm();
