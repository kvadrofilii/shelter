export class Card {
  constructor(src, title, parentSelector) {
    this.src = src;
    this.title = title;
    this.parent = document.querySelector(parentSelector);
  }

  render() {
    const element = document.createElement('article');
    element.classList.add('slider__card');
    element.innerHTML = `
      <img class="slider__image" src=${this.src} alt=${this.title}>
      <h4 class="slider__name">${this.title}</h4>
      <button class="button slider__button">Learn more</button>
    `;
    this.parent.append(element);
  }
}

export class Modal {
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
