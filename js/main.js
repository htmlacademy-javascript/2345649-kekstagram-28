import { createThumbnails } from './thumbnails.js';
import { configureUploadImageForm } from './form.js';
import { loadPhotos } from './api.js';
import { showAlert } from './utils/misc.js';

loadPhotos(createThumbnails, () => showAlert('Ошибка загрузки с сервера'));
configureUploadImageForm();
