'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const allSections = document.querySelectorAll('.section');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(tabContent =>
    tabContent.classList.remove('operations__content--active'),
  );

  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const handleHover = function (e) {
  // console.log(this, e.currentTarget.classList);
  const hover = e.type == 'mouseover' ? true : false;
  // console.log('hover', hover);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = hover === true ? 0.5 : 1.0;
    });
    logo.style.opacity = hover === true ? 0.5 : 1.0;
  }
};

nav.addEventListener('mouseover', handleHover);
nav.addEventListener('mouseout', handleHover);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log('meow', entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

const sectionOperation = {
  root: null,
  threshold: 0.15,
};
const sectionCallBack = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(
  sectionCallBack,
  sectionOperation,
);

allSections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// Lazy loading image
const imgTargets = document.querySelectorAll('img[data-src]'); //value is in css format
const loadImg = function (entries, observer) {
  entries.forEach(entry => {
    // console.log(entry);
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
      observer.unobserve(entry.target);
    });
  });
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => {
  imgObserver.observe(img);
});

//Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`,
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`),
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };
  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    else if (e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};

slider();

////////////////////////
////////////////////////
////////////////////////

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('.section--1');
// const allbuttons = document.getElementsByTagName('button');
// console.log(allbuttons);

// console.log(document.getElementsByTagName('btn'));

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functions and analytics.';
// message.innerHTML =
//   'We use cookies for improved functions and analytics. <button class ="btn btn--close-cookie">Got it!</button>';
// // header.prepend(message);
// // header.append(message.cloneNode(true));
// header.append(message);

// // header.before(message);
// // header.after(message);

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function (e) {
//     e.preventDefault();
//     document.querySelector('.cookie-message').remove();
//     // message.remove();
//     // message.parentElement.removeChild(message);
//   });

// //Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '104.1%';

// console.log(getComputedStyle(message).color);
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// // Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt); //standard properties of images
// console.log(logo.src); //standard properties of images || new properties which are not standard will return undefined
// console.log(logo.designer);

// logo.setAttribute('designer', 'joe');
// console.log(logo);
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// console.log(logo.dataset.versionNumber);

// const h1 = document.querySelector('h1');

// const alterH1 = function (e) {
//   alert('Hehehe you are a boomer (3(-v-)3)');
// };

// h1.addEventListener('mouseenter', alterH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alterH1), 3000);

// const randomInt = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1));
// };

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   console.log('LINKS');
//   this.style.backgroundColor = randomColor(0, 255);
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor(0, 255);
// });

// document.querySelector('.nav__link').addEventListener('click', function (e) {});

// const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);

// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// console.log(h1.parentNode);
// h1.closest('.header').style.background = 'var(--gradient-secondary)'; //header is class tag so dot operator needed
// h1.closest('h1').style.background = 'var(--gradient-primary)'; //h1 is html tag so dot operator not needed

// console.log(h1.parentElement.children);
// const childrenArray = [...h1.parentElement.children];
// childrenArray.forEach(function (el) {
//   if (el !== h1) console.log(el);
//   else console.log('skipped');
// });

// const handleHover = function (e) {
//   console.log('e: ', e);
//   const hover = e.type == 'mouseover' ? true : false;
//   console.log('hover', hover);
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = this === true ? 0.5 : 1.0;
//     });
//     logo.style.opacity = this === true ? 0.5 : 1.0;
//   }
// };

// const callBack = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const operation = {
//   root: null, // Use 'null' to track visibility relative to the device viewport
//   // rootMargin: '0px',  // Visual padding. '100px' triggers the event 100px before reaching the screen
//   threshold: [0, 0.2], // Triggers when 10% (0.1) of the target element becomes visible on screen
// };

// const observer = new IntersectionObserver(callBack, operation);
// observer.observe(section1);

//Learn More - button nagivation
// btnScrollTo.addEventListener('click', function (e) {
//   const s1Coords = section1.getBoundingClientRect();
//   console.log(s1Coords);
//   // logo.classList.add();
//   // logo.classList.remove();
//   // logo.classList.contains();
//   // logo.classList.toggle();
//   // logo.className = 'baker';
//   // console.log(e.target.getBoundingClientRect());
//   // console.log(e.target.innerHTML);
//   // console.log(e.target.className);
//   // console.log(window.pageXOffset);
//   // console.log(window.pageYOffset);

//   // window.scrollTo(
//   //   s1Coords.left + window.pageXOffset,
//   //   s1Coords.top + window.pageYOffset,
//   // );
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

//Page Navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   e.preventDefault();
//   // console.log(e.target);
//   // console.log(e.currentTarget);

//   //Matching Strategy
//   if (e.target.classList.contains('nav__link')) {
//     const id = e.target.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   }
// });

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded');
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = 'message';
// });
