const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET: '/data',
  POST: '/'
};
const ErrorText = {
  GET: 'Ошибка загрузки данных. Попробуйте обновить страницу',
  POST: 'Ошибка отправки данных. Попробуйте ещё раз',
};

const load = (route, errorText, method = 'GET', body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

export const loadPhotos = () => load(Route.GET, ErrorText.GET);

export const uploadPhoto = (body) => load(Route.POST, ErrorText.POST, 'POST', body);
