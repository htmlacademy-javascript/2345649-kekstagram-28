export const loadPhotos = (cb, onError) => {
  fetch('https://28.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      onError();
    })
    .then((data) => cb(data))
    .catch(() => onError());
};
