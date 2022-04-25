'use strict';

const PAGE_HEADER = document.querySelector('.page-header'),
  BURGER_BTN = PAGE_HEADER.querySelector('.burger__btn'),
  BURGER_CONTENT = PAGE_HEADER.querySelector('.burger__content'),
  // Получаю узел затемнения под меню
  NAV_OVERFLOW = document.querySelector('#nav-overflow');

BURGER_BTN.addEventListener('click', () => toggleClass());

BURGER_CONTENT.addEventListener('click', e => {
  // Получаю нажатую ссылку
  const link = e.target.closest('.burger__link');
  // Если нажали мимо ссылки, то прерываю функцию
  if (!link) return;
  // Закрываю меню
  toggleClass();
});

// Закрытие меню при нажатии вне него
NAV_OVERFLOW.addEventListener('click', e => e.target === NAV_OVERFLOW && toggleClass());


function toggleClass() {
  BURGER_CONTENT.classList.toggle('burger__toggle');
  BURGER_BTN.classList.toggle('burger__toggle');
  PAGE_HEADER.classList.toggle('burger__toggle');
  document.body.style.overflow === 'hidden' ?
    document.body.style.overflow = '' :
    document.body.style.overflow = 'hidden';
  NAV_OVERFLOW.classList.toggle('show');
}
