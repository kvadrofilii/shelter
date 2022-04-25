'use strict';

import { pets } from './data.js';
import { Modal, Card } from './classes.js';

// Считаю количество карточек в данных
const CARD_VALUE = pets.length,
  // Массив для генерации псевдослучайной последовательности карточек слайдера
  ARR_ALL_CARD = addNumberForArray(CARD_VALUE),
  // Получаю узел слайдера на главной странице
  SLIDER_MAIN = document.querySelector('#slider-main'),
  // Получаю узлы со слайдера на главной странице
  CAROUSEL = SLIDER_MAIN.querySelector('.slider__carousel'),
  MAIN_BTN_LEFT = SLIDER_MAIN.querySelector('.slider__prev'),
  MAIN_BTN_RIGHT = SLIDER_MAIN.querySelector('.slider__next'),
  ITEM_ACTIVE = SLIDER_MAIN.querySelector('#item-active'),
  ITEM_LEFT = SLIDER_MAIN.querySelector('#item-left'),
  ITEM_RIGHT = SLIDER_MAIN.querySelector('#item-right'),
  // Получаю узел затемнения модального окна
  MODAL_OVERFLOW = document.querySelector('#modal-overflow'),
  // Получаю узел модального окна
  MODAL = document.querySelector('.modal'),
  // Получаю узел кнопки у модального окна
  MODAL_CLOSE_BTN = MODAL.querySelector('.modal__button');

// Переменная для количества отображаемых карточек на экране
let mediaNum = 0;
// Получаю количество карточек в зависимости от размера экрана
getMediaNum();

// Генерирую псевдослучайные числа и сохраняю первые n-чисел равное mediaNum
let arrActiveCard = shuffle(ARR_ALL_CARD).slice(0, mediaNum),
  // Создаю новый массив без чисел с главного экрана
  arrNextCard = shuffle(filterArray(ARR_ALL_CARD, arrActiveCard)).slice(0, mediaNum);


console.log('Текущий массив: ', arrActiveCard);
console.log('Новый массив: ', arrNextCard);

// Вывожу карточки в слайдере
const outputSliderCard = (value, arrayIndex, parentSelector) => {

  for (let i = 0; i < value; i++) {
    new Card(
      pets[arrayIndex[i]].img,
      pets[arrayIndex[i]].name,
      parentSelector
    ).render();
  }
}
outputSliderCard(mediaNum, arrActiveCard, '#item-active')

// Слушаю изменение размера окна
const resize = () => {
  // Получаю количество карточек в зависимости от размера экрана
  getMediaNum();
  // Очищаю слайдер
  ITEM_ACTIVE.innerHTML = '';
  // Генерирую псевдослучайные числа и сохраняю первые n-чисел равное mediaNum
  arrActiveCard = shuffle(ARR_ALL_CARD).slice(0, mediaNum);
  // Создаю новый массив без чисел с главного экрана
  arrNextCard = shuffle(filterArray(ARR_ALL_CARD, arrActiveCard)).slice(0, mediaNum);
  // Вывожу карточки в слайдере
  outputSliderCard(mediaNum, arrActiveCard, '#item-active')

  console.log('Текущий массив: ', arrActiveCard);
  console.log('Новый массив: ', arrNextCard);
}
window.addEventListener('resize', resize);


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
SLIDER_MAIN.addEventListener('click', e => {
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

// Заполняю массив числами
function addNumberForArray(value) {
  const result = [];
  for (let i = 0; i < value; i++) {
    result.push(i)
  }
  return result;
}


// Перемешиваю массив чисел
function shuffle(array) {
  const result = array
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return result;
}

// Создаю новый массив без чисел в активном окне
function filterArray(arrayAllCard, arrayActiveCard) {
  return arrayAllCard.filter(i => !arrayActiveCard.includes(i))
    .concat(arrayActiveCard.filter(i => !arrayAllCard.includes(i)));
}



const moveLeft = () => {
  CAROUSEL.classList.add('transition-left');
  MAIN_BTN_LEFT.removeEventListener('click', moveLeft);
  MAIN_BTN_RIGHT.removeEventListener('click', moveRight);
  outputSliderCard(mediaNum, arrNextCard, '#item-left')
};

const moveRight = () => {
  CAROUSEL.classList.add('transition-right');
  MAIN_BTN_LEFT.removeEventListener('click', moveLeft);
  MAIN_BTN_RIGHT.removeEventListener('click', moveRight);
  outputSliderCard(mediaNum, arrNextCard, '#item-right')
};

MAIN_BTN_LEFT.addEventListener('click', moveLeft);
MAIN_BTN_RIGHT.addEventListener('click', moveRight);

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
  arrActiveCard = [...arrNextCard];
  arrNextCard = shuffle(filterArray(ARR_ALL_CARD, arrActiveCard)).slice(0, mediaNum);

  console.log('Текущий массив: ', arrActiveCard);
  console.log('Новый массив: ', arrNextCard);

  changedItem.innerHTML = '';

  MAIN_BTN_LEFT.addEventListener('click', moveLeft);
  MAIN_BTN_RIGHT.addEventListener('click', moveRight);
})

// Получаю количество карточек в зависимости от размера экрана
function getMediaNum() {
  if (document.documentElement.clientWidth < 768) {
    mediaNum = 1;
  } else if (document.documentElement.clientWidth >= 768 &&
    document.documentElement.clientWidth < 1280) {
    mediaNum = 2;
  } else if (document.documentElement.clientWidth >= 1280) {
    mediaNum = 3;
  }
}
