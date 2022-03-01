"use strict";

function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

// ====swiper==========================================================================================
const productsMiniSwiper = new Swiper('.products-mini-slider', {
  loop: true,
   breakpoints: {
    320: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 120,
    }
  }
});

const productsSwiper = new Swiper('.products-slider', {
  // Optional parameters
  loop: true,
  slidesPerView: 1,
  autoplay: {
    delay: 5000,
    // Отключить после ручного переключения
    disableOnInteraction: true
  },
  speed: 1000,
  autoHeight: true,

  // Свайпер с мениатюрами
  thumbs: {
    swiper: productsMiniSwiper
  },
  // Navigation arrows
  navigation: {
    nextEl: '.products-slider__swiper-button_next',
    prevEl: '.products-slider__swiper-button_prev',
  },

});

const productionSwiper = new Swiper('.production-slider', {
  // Optional parameters
  loop: true,
  centeredSlides: true,
  spaceBetween: 20,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 2,
    },
    767: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    }
  },
  // Navigation arrows
  navigation: {
    nextEl: '.production-slider__swiper-button_next',
    prevEl: '.production-slider__swiper-button_prev',
  },

  pagination: {
    el: '.production-slider__pagination-container',
    bulletActiveClass: 'production-slider__pagination-item_active',
    bulletClass: 'production-slider__pagination-item',
    clickable: true,
  },

});

//======functions=================================================================================
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
  ua = navigator.userAgent;
  var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
  return is_ie;
}
if (isIE()) {
  document.querySelector('html').classList.add('ie');
}
if (isMobile.any()) {
  document.querySelector('html').classList.add('_touch');
}

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
  if (support === true) {
    document.querySelector('html').classList.add('_webp');
  } else {
    document.querySelector('html').classList.add('_no-webp');
  }
});

//=================
// картинка - фон
function ibg() {
  if (isIE()) {
    let ibg = document.querySelectorAll("._ibg");
    for (var i = 0; i < ibg.length; i++) {
      if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
        ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
      }
    }
  }
}
ibg();

//=================
// класс _losded для wrapper
window.addEventListener("load", function () {
  if (document.querySelector('.wrapper')) {
    setTimeout(function () {
      document.querySelector('.wrapper').classList.add('_loaded');
    }, 0);
  }
});

let unlock = true;

//=================
//ActionsOnHash
if (location.hash) {
  const hsh = location.hash.replace('#', '');
  if (document.querySelector('.popup_' + hsh)) {
    popup_open(hsh);
  } else if (document.querySelector('div.' + hsh)) {
    _goto(document.querySelector('.' + hsh), 500, '');
  }
}

//=================
//Menu
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
  let delay = 500;
  let menuBody = document.querySelector(".menu__body");
  iconMenu.addEventListener("click", function (e) {
    if (unlock) {
      body_lock(delay);
      iconMenu.classList.toggle("_active");
      menuBody.classList.toggle("_active");
    }
  });
};
function menu_close() {
  let iconMenu = document.querySelector(".icon-menu");
  let menuBody = document.querySelector(".menu__body");
  iconMenu.classList.remove("_active");
  menuBody.classList.remove("_active");
}


//=================
//BodyLock
function body_lock(delay) {
  let body = document.querySelector("body");
  if (body.classList.contains('_lock')) {
    body_lock_remove(delay);
  } else {
    body_lock_add(delay);
  }
}
function body_lock_remove(delay) {
  let body = document.querySelector("body");
  if (unlock) {
    let lock_padding = document.querySelectorAll("._lp");
    setTimeout(() => {
      for (let index = 0; index < lock_padding.length; index++) {
        const el = lock_padding[index];
        el.style.paddingRight = '0px';
      }
      body.style.paddingRight = '0px';
      body.classList.remove("_lock");
    }, delay);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, delay);
  }
}
function body_lock_add(delay) {
  let body = document.querySelector("body");
  if (unlock) {
    let lock_padding = document.querySelectorAll("._lp");
    for (let index = 0; index < lock_padding.length; index++) {
      const el = lock_padding[index];
      el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    }
    body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    body.classList.add("_lock");

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, delay);
  }
}
//=================
// LettersAnimation
let title = document.querySelectorAll('._letter-animation');
if (title) {
  for (let index = 0; index < title.length; index++) {
    let el = title[index];
    let txt = el.innerHTML;
    let txt_words = txt.replace('  ', ' ').split(' ');
    let new_title = '';
    for (let index = 0; index < txt_words.length; index++) {
      let txt_word = txt_words[index];
      let len = txt_word.length;
      new_title = new_title + '<p>';
      for (let index = 0; index < len; index++) {
        let it = txt_word.substr(index, 1);
        if (it == ' ') {
          it = '&nbsp;';
        }
        new_title = new_title + '<span>' + it + '</span>';
      }
      el.innerHTML = new_title;
      new_title = new_title + '&nbsp;</p>';
    }
  }
}

//=================
//Gallery
let gallery = document.querySelectorAll('._gallery');
if (gallery) {
  gallery_init();
}
function gallery_init() {
  for (let index = 0; index < gallery.length; index++) {
    const el = gallery[index];
    lightGallery(el, {
      counter: false,
      selector: 'a',
      download: false
    });
  }
}

//=================
//DigiFormat
function digi(str) {
  var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  return r;
}

//DiGiAnimate
function digi_animate(el) {
  const el_to = parseInt(el.innerHTML.replace(' ', ''));
  if (!el.classList.contains('_done')) {
    digi_animate_value(el, 0, el_to, 3000);
  }
}
function digi_animate_value(el, start, end, duration) {
  var obj = el;
  var range = end - start;
  // no timer shorter than 50ms (not really visible any way)
  var minTimer = 50;
  // calc step time to show all interediate values
  var stepTime = Math.abs(Math.floor(duration / range));

  // never go below minTimer
  stepTime = Math.max(stepTime, minTimer);

  // get current time and calculate desired end time
  var startTime = new Date().getTime();
  var endTime = startTime + duration;
  var timer;

  function run() {
    var now = new Date().getTime();
    var remaining = Math.max((endTime - now) / duration, 0);
    var value = Math.round(end - (remaining * range));
    obj.innerHTML = digi(value);
    if (value == end) {
      clearInterval(timer);
    }
  }

  timer = setInterval(run, stepTime);
  run();

  el.classList.add('_done');
}

//=================
//Popups
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
  const el = popup_link[index];
  el.addEventListener('click', function (e) {
    if (unlock) {
      let item = el.getAttribute('href').replace('#', '');
      let video = el.getAttribute('data-video');
      popup_open(item, video);
    }
    e.preventDefault();
  })
}
for (let index = 0; index < popups.length; index++) {
  const popup = popups[index];
  popup.addEventListener("click", function (e) {
    if (!e.target.closest('.popup__body')) {
      popup_close(e.target.closest('.popup'));
    }
  });
}
function popup_open(item, video = '') {
  let activePopup = document.querySelectorAll('.popup._active');
  if (activePopup.length > 0) {
    popup_close('', false);
  }
  let curent_popup = document.querySelector('.popup_' + item);
  if (curent_popup && unlock) {
    if (video != '' && video != null) {
      let popup_video = document.querySelector('.popup_video');
      popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
    }
    if (!document.querySelector('.menu__body._active')) {
      body_lock_add(500);
    }
    curent_popup.classList.add('_active');
    history.pushState('', '', '#' + item);
  }
}
function popup_close(item, bodyUnlock = true) {
  if (unlock) {
    if (!item) {
      for (let index = 0; index < popups.length; index++) {
        const popup = popups[index];
        let video = popup.querySelector('.popup__video');
        if (video) {
          video.innerHTML = '';
        }
        popup.classList.remove('_active');
      }
    } else {
      let video = item.querySelector('.popup__video');
      if (video) {
        video.innerHTML = '';
      }
      item.classList.remove('_active');
    }
    if (!document.querySelector('.menu__body._active') && bodyUnlock) {
      body_lock_remove(500);
    }
    history.pushState('', '', window.location.href.split('#')[0]);
  }
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
  for (let index = 0; index < popup_close_icon.length; index++) {
    const el = popup_close_icon[index];
    el.addEventListener('click', function () {
      popup_close(el.closest('.popup'));
    })
  }
}
document.addEventListener('keydown', function (e) {
  if (e.code === 'Escape') {
    popup_close();
  }
});

//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = true;
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
}
let _slideDown = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    if (target.hidden) {
      target.hidden = false;
    }
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
}
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
}
//========================================
//Wrap
function _wrap(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}
//========================================
//RemoveClasses
function _removeClasses(el, class_name) {
  for (var i = 0; i < el.length; i++) {
    el[i].classList.remove(class_name);
  }
}
//========================================
//IsHidden
function _is_hidden(el) {
  return (el.offsetParent === null)
}
// ShowMore Beta ========================
let moreBlocks = document.querySelectorAll('._more-block');
if (moreBlocks.length > 0) {
  let wrapper = document.querySelector('.wrapper');
  for (let index = 0; index < moreBlocks.length; index++) {
    const moreBlock = moreBlocks[index];
    let items = moreBlock.querySelectorAll('._more-item');
    if (items.length > 0) {
      let itemsMore = moreBlock.querySelector('._more-link');
      let itemsContent = moreBlock.querySelector('._more-content');
      let itemsView = itemsContent.getAttribute('data-view');
      if (getComputedStyle(itemsContent).getPropertyValue("transition-duration") === '0s') {
        itemsContent.style.cssText = "transition-duration: 1ms";
      }
      itemsMore.addEventListener("click", function (e) {
        if (itemsMore.classList.contains('_active')) {
          setSize();
        } else {
          setSize('start');
        }
        itemsMore.classList.toggle('_active');
        e.preventDefault();
      });

      let isScrollStart;
      function setSize(type) {
        let resultHeight;
        let itemsContentHeight = 0;
        let itemsContentStartHeight = 0;

        for (let index = 0; index < items.length; index++) {
          if (index < itemsView) {
            itemsContentHeight += items[index].offsetHeight;
          }
          itemsContentStartHeight += items[index].offsetHeight;
        }
        resultHeight = (type === 'start') ? itemsContentStartHeight : itemsContentHeight;
        isScrollStart = window.innerWidth - wrapper.offsetWidth;
        itemsContent.style.height = `${resultHeight}px`;
      }

      itemsContent.addEventListener("transitionend", updateSize, false);

      function updateSize() {
        let isScrollEnd = window.innerWidth - wrapper.offsetWidth;
        if (isScrollStart === 0 && isScrollEnd > 0 || isScrollStart > 0 && isScrollEnd === 0) {
          if (itemsMore.classList.contains('_active')) {
            setSize('start');
          } else {
            setSize();
          }
        }
      }
      window.addEventListener("resize", function (e) {
        if (!itemsMore.classList.contains('_active')) {
          setSize();
        } else {
          setSize('start');
        }
      });
      setSize();
    }
  }
}

//========================================
//Animate
function animate({ timing, draw, duration }) {
  let start = performance.now();
  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);

    draw(progress); // отрисовать её

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}
function makeEaseOut(timing) {
  return function (timeFraction) {
    return 1 - timing(1 - timeFraction);
  }
}
function makeEaseInOut(timing) {
  return function (timeFraction) {
    if (timeFraction < .5)
      return timing(2 * timeFraction) / 2;
    else
      return (2 - timing(2 * (1 - timeFraction))) / 2;
  }
}
function quad(timeFraction) {
  return Math.pow(timeFraction, 2)
}
function circ(timeFraction) {
  return 1 - Math.sin(Math.acos(timeFraction));
}

//Полифилы
(function () {
  // проверяем поддержку
  if (!Element.prototype.closest) {
    // реализуем
    Element.prototype.closest = function (css) {
      var node = this;
      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();
(function () {
  // проверяем поддержку
  if (!Element.prototype.matches) {
    // определяем свойство
    Element.prototype.matches = Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
})();
//=====script==========================================================================================
// убрать в бургер блок с телефоном на маленьких разрешениях экрана
dynamic_adapt();
window.addEventListener("resize", function (event) {
  dynamic_adapt();
});

function dynamic_adapt() {
  let dataMove = document.querySelector('[data-move]');
  if (dataMove) {
    let dataMoveWidth = dataMove.getAttribute('data-move');
    if (dataMoveWidth) {
      let docWidth = document.documentElement.clientWidth;
      if (docWidth < dataMoveWidth) {
        let menuBody = document.querySelector(".menu__body");
        menuBody.append(dataMove);
      } else {
        let headerContainer = document.querySelector(".header__container");
        headerContainer.append(dataMove);
      }
    }
  }
}

// клик по кнопке "Получить суперпредложение" на маленьких экранах
const btnOrders = document.querySelectorAll('.btn-order');
for (const btnOrder of btnOrders) {
  const order = btnOrder.previousElementSibling;
  if (order && order.classList.contains('order')) {
    btnOrder.addEventListener('click', clickOrder);
    function clickOrder() {
      btnOrder.classList.add('_active');
      order.classList.add('_active');
      order.style.maxHeight = order.scrollHeight + 20 + "px";
    }
    //window.addEventListener("resize", resizeOrder);
    function resizeOrder() {
      if (btnOrder.classList.contains('_active') && order.classList.contains('_active')) {
        btnOrder.classList.remove('_active');
        order.classList.remove('_active');
        order.style.maxHeight = null;
      }
    }
  }
}

// скрыть решения
const solutions = document.querySelector('.solutions__content');
const hideBtnSolutions = document.querySelector('.solutions__hide-btn');
const hideTextSolutions = document.querySelector('.solutions__hide-text');
const headerHeight = document.querySelector('.header__container').offsetHeight;
let rectSolutionsTop = solutions.getBoundingClientRect().top;
solutions.style.maxHeight = solutions.scrollHeight + "px";
if (hideBtnSolutions && solutions) {
  hideBtnSolutions.addEventListener('click', hideSolution);
  function hideSolution() {
    hideBtnSolutions.classList.toggle('_hide');
    solutions.classList.toggle('_hide');
    if (solutions.classList.contains('_hide')) {
      solutions.style.maxHeight = 0;
      hideTextSolutions.textContent = 'ПОКАЗАТЬ решения';
      if (rectSolutionsTop < headerHeight) {
        setTimeout(function () {
          let scr = new SmoothScroll();
          scr.animateScroll(document.querySelector('.solutions'), '', { speed: 1000 });
        }, 1000);
      }
    } else {
      solutions.style.maxHeight = solutions.scrollHeight + "px";
      solutions.style.overflow = 'hidden';
      hideTextSolutions.textContent = 'СКРЫТЬ все решения';
    }
  }
}
//====forms========================================================================================
let forms = document.querySelectorAll('form');

if (forms.length > 0) {
  for (const form of forms) {
    form.addEventListener('submit', form_submit);
  }
}

async function form_submit(e) {
  let btn = e.target;
  let form = btn.closest('form');
  let error = form_validate(form);

  if (error == 0) {
    let formData = new FormData(form);
    //checkboxes
    const checkImputs = document.querySelectorAll('.form-check__input');
    for (const checkImput of checkImputs) {
      if (checkImput.checked) {
        formData.append('check[]', checkImput.value);
      }
    }

    let formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
    let formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
    const message = 'form-message';
    let popupText = document.querySelector('.popup_' + message + ' .popup__text');
    const ajax = form.getAttribute('data-ajax');

    //SendForm
    if (ajax) {
      e.preventDefault();
      form.classList.add('_sending');
      let response = await fetch(formAction, {
        method: formMethod,
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
        form.classList.remove('_sending');
        if (popupText) {
          popupText.textContent = result.message + ' Статус: ' + result.status;
        }
        popup_open(message);
        form_clean(form);
      } else {
        if (popupText) {
          popupText.textContent = 'Ошибка при отправке данных: ' + response.status;
          popup_open(message);
        }
        form.classList.remove('_sending');
      }
    }
  } else {
    let form_error = form.querySelectorAll('._error');
    if (form_error && form.classList.contains('_goto-error')) {
      _goto(form_error[0], 1000, 50);
    }
    e.preventDefault();
  }
}

function form_validate(form) {
  let error = 0;
  let form_req = form.querySelectorAll('._req');
  if (form_req.length > 0) {
    for (let index = 0; index < form_req.length; index++) {
      const el = form_req[index];
      if (!_is_hidden(el)) {
        error += form_validate_input(el);
      }
    }
  }
  return error;
}

function form_validate_input(input) {
  let error = 0;
  let input_g_value = input.getAttribute('data-value');

  if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
    if (input.value != input_g_value) {
      let em = input.value.replace(" ", "");
      input.value = em;
    }
    if (email_test(input) || input.value == input_g_value) {
      form_add_error(input);
      error++;
    } else {
      form_remove_error(input);
    }
  } else {
    if (input.value == '' || input.value == input_g_value) {
      form_add_error(input);
      error++;
    } else {
      form_remove_error(input);
    }
  }
  return error;
}

function form_add_error(input) {
  input.classList.add('_error');
  input.parentElement.classList.add('_error');

  let input_error = input.parentElement.querySelector('.form__error');
  if (input_error) {
    input.parentElement.removeChild(input_error);
  }
  let input_error_text = input.getAttribute('data-error');
  if (input_error_text && input_error_text != '') {
    input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
  }
}

function form_remove_error(input) {
  input.classList.remove('_error');
  input.parentElement.classList.remove('_error');

  let input_error = input.parentElement.querySelector('.form__error');
  if (input_error) {
    input.parentElement.removeChild(input_error);
  }
}

function form_clean(form) {
  let inputs = form.querySelectorAll('._req');
  for (let index = 0; index < inputs.length; index++) {
    const el = inputs[index];
    el.parentElement.classList.remove('_focus');
    el.classList.remove('_focus');
    el.value = el.getAttribute('data-value');
  }

  let checkImputs = document.querySelectorAll('.form-check__input');
  for (const checkImput of checkImputs) {
    checkImput.checked = false;
  }

}

//Placeholers
let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);

function inputs_init(inputs) {
  if (inputs.length > 0) {
    for (let index = 0; index < inputs.length; index++) {
      const input = inputs[index];
      const input_g_value = input.getAttribute('data-value');
      input_placeholder_add(input);
      if (input.value != '' && input.value != input_g_value) {
        input_focus_add(input);
      }
      input.addEventListener('focus', function (e) {
        if (input.value == input_g_value) {
          input_focus_add(input);
          input.value = '';
        }
        if (input.getAttribute('data-type') === "pass") {
          if (input.parentElement.querySelector('._viewpass')) {
            if (!input.parentElement.querySelector('._viewpass').classList.contains('_active')) {
              input.setAttribute('type', 'password');
            }
          } else {
            input.setAttribute('type', 'password');
          }
        }
        if (input.classList.contains('_phone')) {
          //'+7(999) 999 9999'
          //'+38(999) 999 9999'
          //'+375(99)999-99-99'
          input.classList.add('_mask');
          Inputmask("+7 (999) 999-99-99", {
            //"placeholder": '',
            clearIncomplete: true,
            clearMaskOnLostFocus: true,
            onincomplete: function () {
              input_clear_mask(input, input_g_value);
            }
          }).mask(input);
        }
        form_remove_error(input);
      });
      input.addEventListener('blur', function (e) {
        if (input.value == '') {
          input.value = input_g_value;
          input_focus_remove(input);
          if (input.classList.contains('_mask')) {
            input_clear_mask(input, input_g_value);
          }
          if (input.getAttribute('data-type') === "pass") {
            input.setAttribute('type', 'text');
          }
        }
      });
    }
  }
}

function input_placeholder_add(input) {
  const input_g_value = input.getAttribute('data-value');
  if (input.value == '' && input_g_value != '') {
    input.value = input_g_value;
  }
}

function input_focus_add(input) {
  input.classList.add('_focus');
  input.parentElement.classList.add('_focus');
}

function input_focus_remove(input) {
  input.classList.remove('_focus');
  input.parentElement.classList.remove('_focus');
}

function input_clear_mask(input, input_g_value) {
  input.inputmask.remove();
  input.value = input_g_value;
  input_focus_remove(input);
}

//=====scroll==========================================================================================
let scr_body = document.querySelector('body');
let scr_blocks = document.querySelectorAll('._scr-sector');
let scr_items = document.querySelectorAll('._scr-item');
let scr_fix_block = document.querySelectorAll('._side-wrapper');
let scr_min_height = 750;

let scrolling = true;
let scrolling_full = true;

let scrollDirection = 0;

let currentScroll;

//ScrollOnScroll
window.addEventListener('scroll', scroll_scroll);
function scroll_scroll() {
  let src_value = currentScroll = pageYOffset;
  let header = document.querySelector('header.header');
  if (header !== null) {
    if (src_value > 40) {
      header.classList.add('_scroll');
    } else {
      header.classList.remove('_scroll');
    }
  }
  if (scr_blocks.length > 0) {
    for (let index = 0; index < scr_blocks.length; index++) {
      let block = scr_blocks[index];
      let block_offset = offset(block).top;
      let block_height = block.offsetHeight;

      if ((pageYOffset > block_offset - window.innerHeight / 1.5) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
        block.classList.add('_scr-sector_active');
      } else {
        if (block.classList.contains('_scr-sector_active')) {
          block.classList.remove('_scr-sector_active');
        }
      }
      if ((pageYOffset > block_offset - window.innerHeight / 2) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
        if (!block.classList.contains('_scr-sector_current')) {
          block.classList.add('_scr-sector_current');
        }
      } else {
        if (block.classList.contains('_scr-sector_current')) {
          block.classList.remove('_scr-sector_current');
        }
      }
    }
  }
  if (scr_items.length > 0) {
    for (let index = 0; index < scr_items.length; index++) {
      let scr_item = scr_items[index];
      let scr_item_offset = offset(scr_item).top;
      let scr_item_height = scr_item.offsetHeight;

      let scr_item_point = window.innerHeight - (window.innerHeight - scr_item_height / 3);
      if (window.innerHeight > scr_item_height) {
        scr_item_point = window.innerHeight - scr_item_height / 3;
      }

      if ((src_value > scr_item_offset - scr_item_point) && src_value < (scr_item_offset + scr_item_height)) {
        scr_item.classList.add('_active');
        scroll_load_item(scr_item);
        if (scr_item.classList.contains('_digit-anim')) {
          digi_animate(scr_item);
        }
      } else {
        if (!scr_item.classList.contains('_active-no-hide')) {
          // _active-no-hide - класс для э-тов, которые не хотим скроллить повторно
          scr_item.classList.remove('_active');
        }
      }
      if (((src_value > scr_item_offset - window.innerHeight))) {
        if (scr_item.querySelectorAll('._lazy').length > 0) {
          scroll_lazy(scr_item);
        }
      }
    }
  }
  if (scr_fix_block.length > 0) {
    fix_block(scr_fix_block, src_value);
  }
  let custom_scroll_line = document.querySelector('._custom-scroll__line');
  if (custom_scroll_line) {
    let window_height = window.innerHeight;
    let content_height = document.querySelector('.wrapper').offsetHeight;
    let scr_procent = (pageYOffset / (content_height - window_height)) * 100;
    let custom_scroll_line_height = custom_scroll_line.offsetHeight;
    custom_scroll_line.style.transform = "translateY(" + (window_height - custom_scroll_line_height) / 100 * scr_procent + "px)";
  }
  if (src_value > scrollDirection) {
    // downscroll code
  } else {
    // upscroll code
  }
  scrollDirection = src_value <= 0 ? 0 : src_value;
}

setTimeout(function () {
  //document.addEventListener("DOMContentLoaded", scroll_scroll);
  scroll_scroll();
}, 100);

function scroll_load_item(scr_item) {
  if (scr_item.classList.contains('_load-map') && !scr_item.classList.contains('_loaded-map')) {
    let map_item = document.getElementById('map');
    if (map_item) {
      scr_item.classList.add('_loaded-map');
      map();
    }
  }
}

function scrParallax(block, scrProcent, blockHeight) {
  let prlxItems = block.querySelectorAll('._prlx-item');
  if (prlxItems.length > 0) {
    for (let index = 0; index < prlxItems.length; index++) {
      const prlxItem = prlxItems[index];
      let prlxItemAttr = (prlxItem.dataset.prlx) ? prlxItem.dataset.prlx : 3;
      const prlxItemValue = -1 * (blockHeight / 100 * scrProcent / prlxItemAttr);
      prlxItem.style.cssText = `transform: translateY(${prlxItemValue}px);`;
    }
  }
}

//FullScreenScroll
if (scr_blocks.length > 0 && !isMobile.any()) {
  disableScroll();
  window.addEventListener('wheel', full_scroll);

  let swiperScrolls = document.querySelectorAll('._swiper_scroll');

  if (swiperScrolls.length > 0) {
    for (let index = 0; index < swiperScrolls.length; index++) {
      const swiperScroll = swiperScrolls[index];
      swiperScroll.addEventListener("mouseenter", function (e) {
        window.removeEventListener('wheel', full_scroll);
      });
      swiperScroll.addEventListener("mouseleave", function (e) {
        window.addEventListener('wheel', full_scroll);
      });
    }
  }
}

function getPrevBlockPos(current_block_prev) {
  let viewport_height = window.innerHeight;
  let current_block_prev_height = current_block_prev.offsetHeight;
  let block_pos = offset(current_block_prev).top;

  if (current_block_prev_height >= viewport_height) {
    block_pos = block_pos + (current_block_prev_height - viewport_height);
  }
  return block_pos;
}

function full_scroll(e) {
  let viewport_height = window.innerHeight;
  if (viewport_height >= scr_min_height) {
    if (scrolling_full) {
      let current_block = document.querySelector('._scr-sector._scr-sector_current');
      let current_block_pos = offset(current_block).top;
      let current_block_height = current_block.offsetHeight;
      let current_block_next = current_block.nextElementSibling;
      let current_block_prev = current_block.previousElementSibling;
      if (e.keyCode == 40 || e.keyCode == 34 || e.deltaX > 0 || e.deltaY < 0) {
        if (current_block_height <= viewport_height) {
          if (current_block_prev) {
            full_scroll_to_sector(getPrevBlockPos(current_block_prev));
          }
        } else {
          enableScroll();
          if (currentScroll <= current_block_pos) {
            if (current_block_prev) {
              full_scroll_to_sector(getPrevBlockPos(current_block_prev));
            }
          }
        }
      } else if (e.keyCode == 38 || e.keyCode == 33 || e.deltaX < 0 || e.deltaY > 0) {
        if (current_block_height <= viewport_height) {
          if (current_block_next) {
            let block_pos = offset(current_block_next).top;
            full_scroll_to_sector(block_pos);
          }
        } else {
          enableScroll();
          if (current_block_next) {
            let block_pos = offset(current_block_next).top;
            if (currentScroll >= block_pos - viewport_height) {
              full_scroll_to_sector(block_pos);
            }
          }
        }
      }
    } else {
      disableScroll();
    }
  } else {
    enableScroll();
  }
}

function full_scroll_to_sector(pos) {
  disableScroll();
  scrolling_full = false;
  _goto(pos, 800);

  let scr_pause = 500;
  if (navigator.appVersion.indexOf("Mac") != -1) {
    scr_pause = 1000;
  };
  setTimeout(function () {
    scrolling_full = true;
  }, scr_pause);
}

function full_scroll_pagestart() { }
function full_scroll_pageend() { }

//ScrollOnClick (Navigation)
let link = document.querySelectorAll('._goto-block');
if (link) {
  let blocks = [];
  for (let index = 0; index < link.length; index++) {
    let el = link[index];
    let block_name = el.getAttribute('href').replace('#', '');
    if (block_name != '' && !~blocks.indexOf(block_name)) {
      blocks.push(block_name);
    }
    el.addEventListener('click', function (e) {
      if (document.querySelector('.menu__body._active')) {
        menu_close();
        body_lock_remove(500);
      }
      let target_block_class = el.getAttribute('href').replace('#', '');
      let target_block = document.querySelector('.' + target_block_class);
      _goto(target_block, 300);
      e.preventDefault();
    })
  }

  window.addEventListener('scroll', function (el) {
    let old_current_link = document.querySelectorAll('._goto-block._active');
    if (old_current_link) {
      for (let index = 0; index < old_current_link.length; index++) {
        let el = old_current_link[index];
        el.classList.remove('_active');
      }
    }
    for (let index = 0; index < blocks.length; index++) {
      let block = blocks[index];
      let block_item = document.querySelector('.' + block);
      if (block_item) {
        let block_offset = offset(block_item).top;
        let block_height = block_item.offsetHeight;
        if ((pageYOffset > block_offset - window.innerHeight / 3) && pageYOffset < (block_offset + block_height) - window.innerHeight / 3) {
          let current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');
          for (let index = 0; index < current_links.length; index++) {
            let current_link = current_links[index];
            current_link.classList.add('_active');
          }
        }
      }
    }
  })
}

//ScrollOnClick (Simple)
let goto_links = document.querySelectorAll('._goto');
if (goto_links) {
  for (let index = 0; index < goto_links.length; index++) {
    let goto_link = goto_links[index];
    goto_link.addEventListener('click', function (e) {
      let target_block_class = goto_link.getAttribute('href').replace('#', '');
      let target_block = document.querySelector('.' + target_block_class);
      _goto(target_block, 300);
      e.preventDefault();
    });
  }
}

function _goto(target_block, speed, offset = 0) {
  let header = '.header__container';
  //OffsetHeader
  //if (window.innerWidth < 992) {
  //	header = 'header';
  //}
  let options = {
    speedAsDuration: true,
    speed: speed,
    header: header,
    offset: offset,
    easing: 'easeOutQuad',
  };
  let scr = new SmoothScroll();
  scr.animateScroll(target_block, '', options);
}

//SameFunctions
function offset(el) {
  var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function disableScroll() {
  if (window.addEventListener) // older FF
    window.addEventListener('DOMMouseScroll', preventDefault, false);
  document.addEventListener('wheel', preventDefault, { passive: false }); // Disable scrolling in Chrome
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove = preventDefault; // mobile
  document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
  if (window.removeEventListener)
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
  document.removeEventListener('wheel', preventDefault, { passive: false }); // Enable scrolling in Chrome
  window.onmousewheel = document.onmousewheel = null;
  window.onwheel = null;
  window.ontouchmove = null;
  document.onkeydown = null;
}

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
    e.preventDefault();
  e.returnValue = false;
}

function fix_block(scr_fix_block, scr_value) {
  let window_width = parseInt(window.innerWidth);
  let window_height = parseInt(window.innerHeight);
  let header_height = parseInt(document.querySelector('header').offsetHeight) + 15;
  for (let index = 0; index < scr_fix_block.length; index++) {
    const block = scr_fix_block[index];
    let block_width = block.getAttribute('data-width');
    const item = block.querySelector('._side-block');
    if (!block_width) { block_width = 0; }
    if (window_width > block_width) {
      if (item.offsetHeight < window_height - (header_height + 30)) {
        if (scr_value > offset(block).top - (header_height + 15)) {
          item.style.cssText = "position:fixed;bottom:auto;top:" + header_height + "px;width:" + block.offsetWidth + "px;left:" + offset(block).left + "px;";
        } else {
          gotoRelative(item);
        }
        if (scr_value > (block.offsetHeight + offset(block).top) - (item.offsetHeight + (header_height + 15))) {
          block.style.cssText = "position:relative;";
          item.style.cssText = "position:absolute;bottom:0;top:auto;left:0px;width:100%";
        }
      } else {
        gotoRelative(item);
      }
    }
  }
  function gotoRelative(item) {
    item.style.cssText = "position:relative;bottom:auto;top:0px;left:0px;";
  }
}

function custom_scroll(event) {
  scr_body.style.overflow = 'hidden';
  let window_height = window.innerHeight;
  let custom_scroll_line = document.querySelector('._custom-scroll__line');
  let custom_scroll_content_height = document.querySelector('.wrapper').offsetHeight;
  let custom_cursor_height = Math.min(window_height, Math.round(window_height * (window_height / custom_scroll_content_height)));
  if (custom_scroll_content_height > window_height) {
    if (!custom_scroll_line) {
      let custom_scroll = document.createElement('div');
      custom_scroll_line = document.createElement('div');
      custom_scroll.setAttribute('class', '_custom-scroll');
      custom_scroll_line.setAttribute('class', '_custom-scroll__line');
      custom_scroll.appendChild(custom_scroll_line);
      scr_body.appendChild(custom_scroll);
    }
    custom_scroll_line.style.height = custom_cursor_height + 'px';
  }
}

let new_pos = pageYOffset;
function scroll_animate(event) {
  let window_height = window.innerHeight;
  let content_height = document.querySelector('.wrapper').offsetHeight;
  let start_position = pageYOffset;
  let pos_add = 100;

  if (event.keyCode == 40 || event.keyCode == 34 || event.deltaX > 0 || event.deltaY < 0) {
    new_pos = new_pos - pos_add;
  } else if (event.keyCode == 38 || event.keyCode == 33 || event.deltaX < 0 || event.deltaY > 0) {
    new_pos = new_pos + pos_add;
  }
  if (new_pos > (content_height - window_height)) new_pos = content_height - window_height;
  if (new_pos < 0) new_pos = 0;

  if (scrolling) {
    scrolling = false;
    _goto(new_pos, 1000);

    let scr_pause = 100;
    if (navigator.appVersion.indexOf("Mac") != -1) {
      scr_pause = scr_pause * 2;
    };
    setTimeout(function () {
      scrolling = true;
      _goto(new_pos, 1000);
    }, scr_pause);
  }
}
