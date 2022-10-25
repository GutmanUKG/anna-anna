"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
document.addEventListener('DOMContentLoaded', function () {
  var body = document.body;
  function clearClass(elements, classActive) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove(classActive);
    }
  }
  //Основной слайдер
  try {
    var bannerSlider = document.querySelector('.banner_slider'),
      bannerItem = bannerSlider.querySelectorAll('.item');
    var bannerOwl = $('.banner_slider');
    $('.banner_slider').owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      items: 1,
      dots: true,
      autoplay: true,
      autoplayTimeout: 4000
    });

    // Go to the next item
    $('.btn_next_banner').click(function () {
      bannerOwl.trigger('next.owl.carousel');
    });
    // Go to the previous item
    $('.btn_prev_banner').click(function () {
      // With optional speed parameter
      // Parameters has to be in square bracket '[]'
      bannerOwl.trigger('prev.owl.carousel', [300]);
    });
    bannerItem.forEach(function (item) {
      if (item.classList.contains('white')) {
        item.parentNode.classList.add('white_slide');
      }
    });

    //Функционал смены темы при переключении слайдера
    var owlItem = bannerSlider.querySelectorAll('.owl-item');
    bannerOwl.on('changed.owl.carousel', function (event) {
      if (owlItem[event.item.index].classList.contains('white_slide')) {
        body.classList.add('white_theme');
      } else {
        body.classList.remove('white_theme');
      }
    });
  } catch (e) {
    console.error(e);
  }
  //Основной слайдер

  //Инициализация и настройка слайдеров для всех товаров
  var OwlSlider = /*#__PURE__*/function () {
    function OwlSlider(_ref) {
      var _ref$itemEl = _ref.itemEl,
        itemEl = _ref$itemEl === void 0 ? null : _ref$itemEl,
        _ref$options = _ref.options,
        options = _ref$options === void 0 ? {} : _ref$options,
        _ref$customBtn = _ref.customBtn,
        customBtn = _ref$customBtn === void 0 ? false : _ref$customBtn,
        _ref$btnNext = _ref.btnNext,
        btnNext = _ref$btnNext === void 0 ? null : _ref$btnNext,
        _ref$btnPrev = _ref.btnPrev,
        btnPrev = _ref$btnPrev === void 0 ? null : _ref$btnPrev,
        _ref$bannerOwl = _ref.bannerOwl,
        bannerOwl = _ref$bannerOwl === void 0 ? null : _ref$bannerOwl,
        _ref$hoverTrigger = _ref.hoverTrigger,
        hoverTrigger = _ref$hoverTrigger === void 0 ? false : _ref$hoverTrigger;
      _classCallCheck(this, OwlSlider);
      this.itemEl = itemEl;
      this.options = options;
      this.customBtn = customBtn;
      this.btnNext = document.querySelector(btnNext);
      this.btnPrev = document.querySelector(btnPrev);
      this.bannerOwl = bannerOwl;
      this.hoverTrigger = hoverTrigger;
    }
    _createClass(OwlSlider, [{
      key: "init",
      value: function init() {
        var _this = this;
        this.itemEl.classList.add('owl-carousel', 'owl-theme');
        $(this.itemEl).owlCarousel(_objectSpread({}, this.options));
        if (this.customBtn === true) {
          var _bannerOwl = $(this.itemEl),
            nextPrev = ['prev', 'next'];
          this.itemEl.parentNode.querySelectorAll('.btn').forEach(function (item, id) {
            item.addEventListener('click', function () {
              _bannerOwl.trigger(nextPrev[id] + '.owl.carousel');
            });
          });
        }
        if (this.hoverTrigger === true) {
          var dots = this.itemEl.querySelectorAll('.owl-dot');
          var _bannerOwl2 = $(this.itemEl);
          dots.forEach(function (item, id) {
            item.addEventListener('mouseenter', function (e) {
              _this.itemEl.trigger('to.owl.carousel', [id, 300]);
            });
          });
        }
      }
    }]);
    return OwlSlider;
  }(); //Слайдер списка товаров
  try {
    var productItemsList = document.querySelectorAll('.product_item_slider');
    productItemsList.forEach(function (item) {
      var nextBtn = item.parentNode.querySelector('.product_items_list_btn_next');
      var prevButton = item.parentNode.querySelector('.product_items_list_btn_prev');
      var slider = tns({
        container: item,
        items: 4,
        nextButton: nextBtn,
        prevButton: prevButton,
        nav: false,
        gutter: 30,
        responsive: {
          1024: {
            items: 4
          },
          996: {
            items: 3
          },
          700: {
            items: 2.3
          }
        }
      });
    });
  } catch (e) {
    console.error(e);
  }

  //Слайдер картинок в товаре
  try {
    var TproductItemsList = document.querySelectorAll('.product_item_imgs');
    TproductItemsList.forEach(function (item) {
      var slider = tns({
        container: item,
        items: 1,
        controls: false,
        nav: true
      });
      var dots = item.parentNode.parentNode.parentNode.querySelectorAll('button');
      dots.forEach(function (item, id) {
        item.addEventListener('mouseenter', function () {
          slider.goTo(id);
        });
      });
    });
  } catch (e) {}
  //Слайдер коллекций
  try {
    var collectionListSlider = tns({
      container: '.collection_list',
      items: 6,
      gutter: 30,
      nav: false,
      controls: false,
      responsive: {
        1024: {
          items: 6
        },
        1023: {
          items: 4
        },
        700: {
          items: 3
        }
      }
    });
  } catch (e) {}
  //Cлайдер капсул и новостей
  try {
    var sliderList = document.querySelectorAll('.slider_list');
    sliderList.forEach(function (item) {
      item = new OwlSlider({
        itemEl: item,
        customBtn: true,
        btnNext: '.btn_next_slider',
        btnPrev: '.btn_prev_slider',
        options: {
          loop: false,
          margin: 30,
          nav: false,
          items: 3,
          dots: false,
          responsive: {
            1024: {
              items: 3
            },
            1023: {
              items: 3
            },
            700: {
              items: 1.3
            }
          }
        }
      });
      item.init();
    });
  } catch (e) {
    console.error(e);
  }

  //Меню каталога
  try {
    var leftMenu = document.querySelector('.left_menu');
    var liElements = leftMenu.querySelectorAll('li');
    liElements.forEach(function (item) {
      if (item.querySelector('ul')) {
        item.classList.add('is_dropdown');
      }
    });
    leftMenu.addEventListener('click', function (e) {
      var target = e.target;
      e.preventDefault();
      e.stopPropagation();
      clearClass(liElements, 'active_drop');
      if (target.parentNode.classList.contains('is_dropdown')) {
        target.parentNode.classList.add('active_drop');
      }
    });
  } catch (e) {
    console.error(e);
  }

  //Выпадашки фильтров

  try {
    var filterList = document.querySelector('.filter_list'),
      filterItems = filterList.querySelectorAll('.item');
    filterItems.forEach(function (item) {
      var filterDropVariant = item.querySelector('.drop');
      if (filterDropVariant != null) {
        var elementsDropVariant = filterDropVariant.querySelectorAll('a');
        console.log(elementsDropVariant.length);
        if (elementsDropVariant.length >= 10) {
          filterDropVariant.classList.add('grid_template');
        }
      }
      item.addEventListener('click', function () {
        clearClass(filterItems, 'active');
        item.classList.add('active');
      });
    });
  } catch (e) {
    console.error(e);
  }

  //Выпадашки информации
  try {
    var infoListItems = document.querySelector('.info_list_items'),
      infoItems = infoListItems.querySelectorAll('.item');
    infoItems.forEach(function (item) {
      item.addEventListener('click', function () {
        clearClass(infoItems, 'active');
        item.classList.add('active');
      });
    });
  } catch (e) {
    console.error(e);
  }

  //Смена основной картинки при клике

  try {
    var dotsImgsList = document.querySelector('#dots_imgs_list'),
      dotsImgsListItem = dotsImgsList.querySelectorAll('.item'),
      sliderVertical = document.querySelector('.slider_vertical');
    var verticalSlider = tns({
      container: '.slider_vertical',
      nav: false,
      controls: false,
      axis: true,
      mouseDrag: true
    });
    dotsImgsListItem[0].classList.add('active');
    dotsImgsListItem.forEach(function (i, id) {
      i.addEventListener('click', function () {
        clearClass(dotsImgsListItem, 'active');
        i.classList.add('active');
        verticalSlider.goTo(id);
      });
    });
  } catch (e) {
    console.error(e);
  }

  //Все для адаптива
  var RelocateElement = /*#__PURE__*/function () {
    function RelocateElement(_ref2) {
      var _ref2$element = _ref2.element,
        element = _ref2$element === void 0 ? null : _ref2$element,
        _ref2$lastElement = _ref2.lastElement,
        lastElement = _ref2$lastElement === void 0 ? null : _ref2$lastElement,
        _ref2$appendClass = _ref2.appendClass,
        appendClass = _ref2$appendClass === void 0 ? null : _ref2$appendClass,
        _ref2$isClone = _ref2.isClone,
        isClone = _ref2$isClone === void 0 ? false : _ref2$isClone;
      _classCallCheck(this, RelocateElement);
      this.element = document.querySelector(element);
      this.lastElement = document.querySelector(lastElement);
      this.appendClass = appendClass;
      this.isClone = isClone;
    }
    _createClass(RelocateElement, [{
      key: "relocate",
      value: function relocate() {
        if (this.isClone === true) {
          this.lastElement.appendChild(this.element.cloneNode(true));
        } else {
          this.lastElement.appendChild(this.element);
        }
      }
    }]);
    return RelocateElement;
  }(); //Меню каталога
  var headerDropMenu = document.querySelector('.header_drop_menu'),
    catalogBtn = document.querySelector('#catalog'),
    closeDropMenu = document.querySelector('.close_drop_menu');
  //Пк версия
  if (body.clientWidth > 1340) {
    catalogBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (headerDropMenu.classList.contains('active')) {
        headerDropMenu.classList.remove('active');
      } else {
        headerDropMenu.classList.add('active');
      }
    });
    closeDropMenu.addEventListener('click', function () {
      headerDropMenu.classList.remove('active');
    });
  }
  var relocateMainMenu = new RelocateElement({
    element: '.main_menu',
    lastElement: '.burger_menu'
  });
  var relocateDropMenu = new RelocateElement({
    element: '.catalog_menu',
    lastElement: '.catalog_drop'
  });
  if (body.clientWidth <= 1340) {
    relocateDropMenu.relocate();
    relocateMainMenu.relocate();
    var burgerMenu = document.querySelector('.burger_menu'),
      burgerBtn = document.querySelector('.burger_btn'),
      burgerLiElements = burgerMenu.querySelectorAll('li');
    burgerBtn.addEventListener('click', function () {
      burgerMenu.classList.toggle('fadeInLeft');
      if (burgerMenu.classList.contains('fadeInLeft')) {
        body.classList.add('white_theme', 'active_burger');
        burgerBtn.classList.add('active');
        body.style.overflow = 'hidden';
      } else {
        body.classList.remove('white_theme', 'active_burger');
        burgerBtn.classList.remove('active');
        clearClass(burgerLiElements, 'is_dropdown');
        body.style.overflow = '';
      }
    });
    burgerLiElements.forEach(function (item) {
      if (item.querySelector('ul')) {
        item.classList.add('is_dropdown');
        item.addEventListener('click', function (e) {
          var target = e.target;
          if (item.classList.contains('is_dropdown') || target.parentNode.classList.contains('is_dropdown')) {
            e.preventDefault();
            item.classList.add('active_dropdown');
          }
          if (!target.parentNode.classList.contains('is_dropdown') && !target.classList.contains('is_dropdown') && !target.classList.contains('#catalog')) {
            document.location.href = target.href;
          }
        });
      }
    });
  }
  if (body.clientWidth < 1200) {
    var popupFilterBottom = document.querySelector('.popup_filter_bottom'),
      popupFilterList = popupFilterBottom.querySelector('.popup_filter_list'),
      topFilterList = document.querySelector('.filter_list'),
      topFilterListItem = topFilterList.querySelectorAll('.item'),
      filltersWrapper = document.querySelector('.fillters'),
      filterBtn = filltersWrapper.querySelector('span'),
      closeBtn = popupFilterBottom.querySelector('.close_btn');
    filterBtn.addEventListener('click', function () {
      popupFilterBottom.style.display = 'block';
    });
    closeBtn.addEventListener('click', function () {
      popupFilterBottom.style.display = '';
    });
    console.log(popupFilterList);
    popupFilterList.appendChild(topFilterList);
    topFilterListItem.forEach(function (item) {
      var elementInTopFilterListItem = item.querySelector('ul');
      if (elementInTopFilterListItem != null) {
        if (elementInTopFilterListItem.children.length > 10) {
          elementInTopFilterListItem.classList.add('grid_three_column');
        }
      }
      item.addEventListener('click', function () {
        clearClass(topFilterListItem, 'active');
        item.classList.add('active');
      });
    });
  }
});
//# sourceMappingURL=script.js.map
