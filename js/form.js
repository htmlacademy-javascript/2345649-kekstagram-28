import { isEscapeKey } from './utils.js';

const uploadImageInput = document.querySelector('#upload-file');
const uploadImageOverlay = document.querySelector('.img-upload__overlay');
const uploadImageForm = document.querySelector('#upload-select-image');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const imageUploadPreview = document.querySelector('.img-upload__preview > img');

const pristine = new Pristine(uploadImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

const onImageLoadCloseClick = () => {
  closeImageLoadModal();
};

const onImageLoadEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImageLoadModal();
  }
};

const onInputKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

function closeImageLoadModal () {
  uploadImageForm.reset();

  document.body.classList.remove('modal-open');
  uploadImageOverlay.classList.add('hidden');

  document.removeEventListener('keydown', onImageLoadEscKeyDown);
}

const onImageSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadImageForm.submit();
    closeImageLoadModal();
  }
};

const validateHashtag = (hashtag) => new RegExp('^#[а-яёa-z0-9]{1,19}$').test(hashtag);
const hashtagsIsUnique = (hashTags) => {
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
const validateHashtags = (value) => {
  const hashtags = value?.toLowerCase().split(' ').filter((tag) => tag !== '');
  return hashtags.length <= 5 && hashtagsIsUnique(hashtags) && hashtags.every(validateHashtag);
};

const onImageSelect = () => {
  uploadImageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  const reader = new FileReader();
  reader.onload = function(event) {
    imageUploadPreview.src = event.target.result;
  };
  reader.readAsDataURL(uploadImageInput.files[0]);

  const uploadCancelBotton = document.querySelector('#upload-cancel');
  uploadCancelBotton.addEventListener('click', onImageLoadCloseClick);
  document.addEventListener('keydown', onImageLoadEscKeyDown);
};

export const configureUploadImageForm = () => {
  uploadImageInput.addEventListener('change', onImageSelect);
  uploadImageForm.addEventListener('submit', onImageSubmit);
  hashtagInput.addEventListener('keydown', onInputKeyDown);
  commentInput.addEventListener('keydown', onInputKeyDown);

  pristine.addValidator(hashtagInput, validateHashtags, 'Неверный формат хэштэгов');
};
