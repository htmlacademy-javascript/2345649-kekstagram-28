export const loadPhotos = (onSuccess, onError) => {
  fetch('https://28.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      onError();
    })
    .then((data) => onSuccess(data))
    .catch(() => onError());
};
