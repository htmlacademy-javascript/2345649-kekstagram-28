import { createThumbnails } from './thumbnails.js';
import { generatePhotos } from './data.js';
import { configureUploadImageForm } from './form.js';

const dummyPhotos = generatePhotos();
createThumbnails(dummyPhotos);
configureUploadImageForm();
