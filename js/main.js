import { createThumbnails } from './thumbnails.js';
import { configureUploadImageForm } from './form.js';
import { loadPhotos } from './api.js';
import { showAlert } from './utils/misc.js';

loadPhotos()
  .then((data) => createThumbnails(data))
  .catch((err) => showAlert(err.message));
configureUploadImageForm();
