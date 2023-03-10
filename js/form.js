import { isEscapeKey } from './utils.js';

const uploadImageInput = document.querySelector('#upload-file');
const uploadImageOverlay = document.querySelector('.img-upload__overlay');
const uploadImageForm = document.querySelector('#upload-select-image');
const hashtagInput = document.querySelector('.text__hashtags');

const onImageLoadCloseClick = () => {
  cancelImageLoad();
};

const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    cancelImageLoad();
  }
};

// const stopEscPropagation = (evt) => {
//   if (isEscapeKey(evt)) {
//     evt.stopPropagation();
//   }
// };

// const onHashtagFocus = () => {
//   document.addEventListener('keydown', () => stopEscPropagation, {once: true});
// };

// const onHashtagBlur = () => {
//   document.removeEventListener('keydown', () => stopEscPropagation);
// };

const useDevelopmentSettings = () => {
  uploadImageOverlay.scrollTo(0, 3000);
  document.querySelector('.text__hashtags').value = '#hash #hash #thisisveryverylongha # #hashwith#hash noreallyhash';
  uploadImageInput.required = false;
};

const onImageLoad = () => {
  uploadImageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  useDevelopmentSettings();

  document.querySelector('#upload-cancel').addEventListener('click', onImageLoadCloseClick);
  document.addEventListener('keydown', onEscKeyDown);
};

const resetForm = () => {
  // uploadImageInput.value = '';
  // document.querySelector('.text__description').value = '';
  // document.querySelector('.text__hashtags').value = '';
  uploadImageForm.reset();
};


const validateHashtag = (hashtag) => {
  const tag = String(hashtag.substring(1));
  const isValid =
  hashtag.startsWith('#') &&
  hashtag.length > 1 &&
  hashtag.length <= 20 &&
  tag === tag.match('[а-яa-z0-9]+')[0];
  return {
    hashtag,
    isValid
  };
};

const hashTagsIsUnique = (hashTags) => {
  for (const tag of hashTags) {
    if (hashTags.reduce((acc, cur) => {
      if (cur === tag) {
        return ++acc;
      }
    }, 0) > 1) {
      return false;
    }
  }
  return true;
};

const validateHashtags = () => {
  const hashTags = hashtagInput.value?.toLowerCase().split(' ');
  const isValid = hashTags.every(validateHashtag) && hashTags.length <= 55 && hashTagsIsUnique(hashTags);
  return hashTags.map(validateHashtag).forEach((it) => it.isValid ? console.log(it) : console.error(it));
};

function cancelImageLoad () {
  resetForm();
  document.body.classList.remove('modal-open');
  uploadImageOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onEscKeyDown);
}

const onImageSubmit = (evt) => {
  evt.preventDefault();
  validateHashtags();

  // hashtagInput.removeEventListener('focus', () => onHashtagFocus);
  // hashtagInput.removeEventListener('blur', () => onHashtagBlur);
};

export const configureUploadImageForm = () => {
  onImageLoad();
  // uploadFileInput.addEventListener('change', onImageLoad);
  // hashtagInput.addEventListener('focus', () => onHashtagFocus);
  // hashtagInput.addEventListener('blur', () => onHashtagBlur);
  uploadImageForm.addEventListener('submit', onImageSubmit);
  // let pristine = new Pristine(uploadImageForm);
};
