import { createThumbnails } from './thumbnails.js';
import { generatePhotos } from './data.js';

const dummyPhotos = generatePhotos();
createThumbnails(dummyPhotos);
