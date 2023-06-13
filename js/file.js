const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarInput = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
const photoInput = document.querySelector('#images');
const photoPreview = document.querySelector('.ad-form__photo');
photoPreview.style.columns = '2';

avatarInput.addEventListener('change', () => {

  const avatarFile = avatarInput.files[0];
  const avatarFileName = avatarFile.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return avatarFileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(avatarFile);
  }
});

photoInput.addEventListener('change', () => {

  const photoFile = photoInput.files[0];
  const photoFileName = photoFile.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return photoFileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const photoElement = document.createElement('img')
      photoElement.width = 80;
      photoElement.height =80;
      photoElement.src = reader.result;

      photoPreview.appendChild(photoElement);

    });

    reader.readAsDataURL(photoFile);
    if (photoPreview.children.length > 9){
      photoInput.setAttribute('disabled', true);
      document.querySelector('label[for="images"]').textContent ='Хватит =)';
    }

  }

});

export {photoPreview, avatarPreview}
