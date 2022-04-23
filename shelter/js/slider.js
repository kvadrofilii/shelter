'use strict';

import { pets } from './data.js';

const overflow = document.querySelector('.overflow'),
  modal = document.querySelector('.modal'),
  modalCloseBtn = modal.querySelector('.modal__button'),
  sliderCard = document.querySelectorAll('.slider__card');

// Слушаю нажатие на карточки слайдера и открываю модальное окно с динамическим наполнением
sliderCard.forEach(card => {
  card.addEventListener('click', (e) => {
    const target = e.currentTarget.childNodes[3].textContent,
      data = pets.filter(item => item.name === target)[0];

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
});

// Закрытие модального окна при нажатии "Escape"
document.addEventListener('keydown', e => {
  (e.code === 'Escape') && modal.classList.contains('show') && closeModal();
}
);

// Закрытие модального окна при нажатии на кнопку "Закрыть"
modalCloseBtn.addEventListener('click', closeModal);

// Закрытие модального окна при нажатии вне него
overflow.addEventListener('click', e => e.target === overflow && closeModal());


class Modal {
  constructor(src, title, subtitle, text, age, inoculations, diseases, parasites, replaceSelector) {
    this.src = src;
    this.title = title;
    this.subtitle = subtitle;
    this.text = text;
    this.age = age;
    this.inoculations = inoculations;
    this.diseases = diseases;
    this.parasites = parasites;
    this.replace = document.querySelector(replaceSelector);
  }

  render() {
    const element = document.createElement('div');
    element.classList.add('modal__container');
    element.innerHTML = `
      <img class="modal__image" src=${this.src} alt=${this.title}>
      <div class="modal__content">
        <h2 class="modal__title">${this.title}</h2>
        <p class="modal__subtitle">${this.subtitle}</p>
        <p class="modal__text">${this.text}</p>
        <ul class="modal__list">
          <li class="modal__item">
            <strong>Age:</strong> ${this.age}
          </li>
          <li class="modal__item">
            <strong>Inoculations:</strong> ${this.inoculations}
          </li>
          <li class="modal__item">
            <strong>Diseases:</strong> ${this.diseases}
          </li>
          <li class="modal__item">
            <strong>Parasites:</strong> ${this.parasites}
          </li>
        </ul>
      </div>
    `;
    this.replace.replaceWith(element);
  }
}

// Закрытие модального окна
function closeModal() {
  toggle();
  document.body.style.overflow = '';
}

// Открытие модально окна
function openModal(src, title, subtitle, text, age, inoculations, diseases, parasites, replaceSelector) {

  new Modal(
    src, title, subtitle, text, age, inoculations, diseases, parasites, replaceSelector
  ).render();
  toggle();
  document.body.style.overflow = 'hidden';
}

// Переключение видимости для модального окна
function toggle() {
  overflow.classList.toggle('show');
  modal.classList.toggle('show');
}
