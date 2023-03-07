import { createThumbnails, showBigPicture } from './thumbnails.js';
import { generatePhotos } from './data.js';

const dummyPhotos = generatePhotos();
createThumbnails(dummyPhotos);

// showBigPicture(dummyPhotos[0]);
