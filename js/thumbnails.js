const createThumbnail = (template, photo) => {
  const thumbnailElement = template.querySelector('.picture').cloneNode(true);
  thumbnailElement.querySelector('.picture__img').src = photo.url;
  thumbnailElement.querySelector('.picture__likes').textContent = photo.likes;
  thumbnailElement.querySelector('.picture__comments').textContent = photo.comments.length;
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
  picturesContainer.append(fragment);
};
