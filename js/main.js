import { initThumbnails } from './thumbnails.js';
import { configureUploadImageForm } from './form.js';
import { loadPhotos } from './api.js';
import { showAlert } from './utils/misc.js';

loadPhotos()
  .then((photos) => {
    initThumbnails(photos);
  })
  .catch((err) => showAlert(err.message));

configureUploadImageForm();
