'use strict';

import { pets } from './data.js';
import { Modal, Card } from './classes.js';

// Считаю количество карточек в данных
const CARD_VALUE = pets.length,
  // Массив для генерации псевдослучайной последовательности карточек слайдера
  ARR_CARD = addNumberForArray(CARD_VALUE),
  // Получаю узел слайдера на главной странице
  SLIDER = document.querySelector('.slider'),
  // Получаю узлы со слайдера на главной странице
  CAROUSEL = SLIDER.querySelector('.slider__carousel'),
  PAGE_NUMBER = SLIDER.querySelector('#page-number'),
  BTN_PREV = SLIDER.querySelector('.slider__prev'),
  BTN_NEXT = SLIDER.querySelector('.slider__next'),
  BTN_START = SLIDER.querySelector('.slider__start'),
  BTN_FINISH = SLIDER.querySelector('.slider__finish'),
  ITEM_ACTIVE = SLIDER.querySelector('#item-active'),
  ITEM_LEFT = SLIDER.querySelector('#item-left'),
  ITEM_RIGHT = SLIDER.querySelector('#item-right'),
  // Получаю узел затемнения модального окна
  MODAL_OVERFLOW = document.querySelector('#modal-overflow'),
  // Получаю узел модального окна
  MODAL = document.querySelector('.modal'),
  // Получаю узел кнопки у модального окна
  MODAL_CLOSE_BTN = MODAL.querySelector('.modal__button');

// Переменная для количества отображаемых карточек на экране
let maxCards = 0,
  // Номер страницы
  page = 0,
  // Массив со всеми карточками
  arrayAllCard = [],
  // Массив с карточками на экране
  arrActiveCard = [];

// Получаю количество карточек в зависимости от размера экрана
getMediaNum();
console.log(arrayAllCard);

// Вывожу карточки в слайдере
const renderSlider = (value, arrayIndex, parentSelector) => {

  for (let i = 0; i < value; i++) {
    new Card(
      pets[arrayIndex[i]].img,
      pets[arrayIndex[i]].name,
      parentSelector
    ).render();
  }

  PAGE_NUMBER.innerHTML = page + 1;
}
renderSlider(maxCards, arrayAllCard.slice(0, maxCards), '#item-active')

// Слушаю изменение размера окна
//const resize = () => {
//  // Получаю количество карточек в зависимости от размера экрана и генерирую массив чисел для вывода карточек
//  getMediaNum();
//  console.log(arrayAllCard);
//  // Очищаю слайдер
//  ITEM_ACTIVE.innerHTML = '';
//  // Вывожу карточки в слайдере
//  renderSlider(maxCards, arrayAllCard.slice(0, maxCards), '#item-active');
//  // Возвращаю 
//  page = 1;
//}
//window.addEventListener('resize', resize);


// Открытие модально окна
const openModal = (src, title, subtitle, text, age, inoculations, diseases, parasites, replaceSelector) => {

  new Modal(
    src, title, subtitle, text, age, inoculations, diseases, parasites, replaceSelector
  ).render();

  toggle();
  // Добавляю правый padding равный ширине прокрутки
  document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
  // Отключаю прокрутку под модальным окном
  document.body.style.overflow = 'hidden';
}


// Слушаю нажатие на карточки слайдера и открываю модальное окно с динамическим наполнением
SLIDER.addEventListener('click', e => {
  // Получаю нажатую карточку
  const card = e.target.closest('.slider__card');
  // Если нажали мимо карточки, то прерываю функцию
  if (!card) return;
  // Получаю имя (title) с карточки
  const name = card.children[1].innerHTML,
    // Нахожу по имени нужный объект с данными на питомца
    data = pets.filter(item => item.name === name)[0];
  // Открываю модальное окно
  openModal(
    data.img,
    data.name,
    `${data.type} ${data.breed}`,
    data.description,
    data.age,
    data.inoculations,
    data.diseases,
    data.parasites,
    '.modal__container'
  );
});


// Закрытие модального окна
const closeModal = () => {
  toggle();
  // Удаляю правый padding равный ширине прокрутки
  document.body.style.paddingRight = '';
  // Включаю обратно прокрутку на сайте
  document.body.style.overflow = '';
}

// Закрытие модального окна при нажатии на кнопку 'Закрыть'
MODAL_CLOSE_BTN.addEventListener('click', closeModal);
// Закрытие модального окна при нажатии вне него
MODAL_OVERFLOW.addEventListener('click', e => e.target === MODAL_OVERFLOW && closeModal());
// Закрытие модального окна при нажатии 'Escape'
document.addEventListener('keydown', e => {
  (e.code === 'Escape') && MODAL.classList.contains('show') && closeModal();
}
);



// Переключение видимости для модального окна
function toggle() {
  MODAL_OVERFLOW.classList.toggle('show');
  MODAL.classList.toggle('show');
}



// Перемешиваю массив чисел
function shuffle(array) {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Получаю количество карточек в зависимости от размера экрана и генерирую массив чисел для вывода карточек
function getMediaNum() {
  if (document.documentElement.clientWidth < 768) {
    maxCards = 3;
    arrayAllCard = arrayMobile();
  } else if (document.documentElement.clientWidth >= 768 &&
    document.documentElement.clientWidth < 1280) {
    maxCards = 6;
    arrayAllCard = arrayMobile();
  } else if (document.documentElement.clientWidth >= 1280) {
    maxCards = 8;
    for (let i = 0; i < 6; i++) {
      arrayAllCard = arrayAllCard.concat(shuffle(ARR_CARD));
    }
  }
}

// Заполняю массив числами
function addNumberForArray(value) {
  const result = [];
  for (let i = 0; i < value; i++) {
    result.push(i)
  }
  return result;
}

// Заполняю 48 псевдослучайных чисел для мобильных экранов
function arrayMobile() {
  let result = [],
    arr = [];
  for (let i = 0; i < 6; i++) {
    arr = arr.concat(ARR_CARD);
  }

  for (let i = 0; i < 8; i++) {
    result = result.concat(shuffle(arr.slice(i * 6, i * 6 + 6)));
  }
  return result;
}



const moveLeft = () => {
  CAROUSEL.classList.add('transition-left');
  BTN_PREV.removeEventListener('click', moveLeft);
  BTN_NEXT.removeEventListener('click', moveRight);
  BTN_START.removeEventListener('click', moveStart);
  BTN_FINISH.removeEventListener('click', moveFinish);

  page > 0 && page--;

  BTN_NEXT.classList.remove('button_disabled');
  BTN_FINISH.classList.remove('button_disabled');

  if (page === 0) {
    BTN_PREV.classList.add('button_disabled');
    BTN_START.classList.add('button_disabled');
  }

  renderSlider(
    maxCards,
    arrayAllCard.slice(maxCards * page, maxCards * page + maxCards),
    '#item-left'
  );
};

const moveRight = () => {
  CAROUSEL.classList.add('transition-right');
  BTN_PREV.removeEventListener('click', moveLeft);
  BTN_NEXT.removeEventListener('click', moveRight);
  BTN_START.removeEventListener('click', moveStart);
  BTN_FINISH.removeEventListener('click', moveFinish);

  switch (maxCards) {
    case 8: {
      page <= 5 && page++;
      if (page === 5) {
        BTN_NEXT.classList.add('button_disabled');
        BTN_FINISH.classList.add('button_disabled');
      }
      break;
    }
    case 6: {
      page <= 7 && page++;
      if (page === 7) {
        BTN_NEXT.classList.add('button_disabled');
        BTN_FINISH.classList.add('button_disabled');
      }
      break;
    }
    case 3: {
      page <= 15 && page++;
      if (page === 15) {
        BTN_NEXT.classList.add('button_disabled');
        BTN_FINISH.classList.add('button_disabled');
      }
      break;
    }
    default:
      break;
  }

  if (page > 0) {
    BTN_PREV.classList.remove('button_disabled');
    BTN_START.classList.remove('button_disabled');
  }

  renderSlider(
    maxCards,
    arrayAllCard.slice(maxCards * page, maxCards * page + maxCards),
    '#item-right'
  );
};

const moveStart = () => {
  CAROUSEL.classList.add('transition-left');
  BTN_PREV.removeEventListener('click', moveLeft);
  BTN_NEXT.removeEventListener('click', moveRight);
  BTN_START.removeEventListener('click', moveStart);
  BTN_FINISH.removeEventListener('click', moveFinish);

  page = 0;
  BTN_PREV.classList.add('button_disabled');
  BTN_START.classList.add('button_disabled');

  BTN_NEXT.classList.remove('button_disabled');
  BTN_FINISH.classList.remove('button_disabled');
  renderSlider(
    maxCards,
    arrayAllCard.slice(maxCards * page, maxCards * page + maxCards),
    '#item-left'
  );
};

const moveFinish = () => {
  CAROUSEL.classList.add('transition-right');
  BTN_PREV.removeEventListener('click', moveLeft);
  BTN_NEXT.removeEventListener('click', moveRight);
  BTN_START.removeEventListener('click', moveStart);
  BTN_FINISH.removeEventListener('click', moveFinish);

  switch (maxCards) {
    case 8: {
      page = 5;
      BTN_NEXT.classList.add('button_disabled');
      BTN_FINISH.classList.add('button_disabled');
      break;
    }
    case 6: {
      page = 7;
      BTN_NEXT.classList.add('button_disabled');
      BTN_FINISH.classList.add('button_disabled');
      break;
    }
    case 3: {
      page = 15;
      BTN_NEXT.classList.add('button_disabled');
      BTN_FINISH.classList.add('button_disabled');
      break;
    }
    default:
      break;
  }

  BTN_PREV.classList.remove('button_disabled');
  BTN_START.classList.remove('button_disabled');

  renderSlider(
    maxCards,
    arrayAllCard.slice(maxCards * page, maxCards * page + maxCards),
    '#item-right'
  );
};


BTN_PREV.addEventListener('click', moveLeft);
BTN_NEXT.addEventListener('click', moveRight);
BTN_START.addEventListener('click', moveStart);
BTN_FINISH.addEventListener('click', moveFinish);

CAROUSEL.addEventListener('animationend', (animationEvent) => {
  let changedItem;
  if (animationEvent.animationName === 'move-left') {
    CAROUSEL.classList.remove('transition-left');
    changedItem = ITEM_LEFT;
    ITEM_ACTIVE.innerHTML = ITEM_LEFT.innerHTML;
  } else {
    CAROUSEL.classList.remove('transition-right');
    changedItem = ITEM_RIGHT;
    ITEM_ACTIVE.innerHTML = ITEM_RIGHT.innerHTML;
  }

  changedItem.innerHTML = '';


  BTN_PREV.addEventListener('click', moveLeft);
  BTN_NEXT.addEventListener('click', moveRight);
  BTN_START.addEventListener('click', moveStart);
  BTN_FINISH.addEventListener('click', moveFinish);
})
