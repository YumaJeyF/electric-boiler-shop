// Этот файл - подключение готовых компонентов

// Подключение необходимых переменных
//==========================================================================

import v from './_vars.js';

//==========================================================================

// Дефолтная функция на определение поддерживает ли браузей webp изображения
//==========================================================================

import * as checkingSupportWebp from './functions/webp_support.js';

checkingSupportWebp.isWebp();

//==========================================================================

// Навигация
//==========================================================================

import { navigation } from './functions/navigation.js';

navigation();

import { workBtnsPhones } from './functions/work_btns_phones.js';

workBtnsPhones();

//==========================================================================

// Аккордеон в футере
//==========================================================================

import { footerAcc } from './functions/footer_accordeon.js';

footerAcc();

//==========================================================================

// Кастомный слайдер для цены
//==========================================================================

import { rangeSlider } from './functions/custom_range_slider.js';

const slider = document.querySelector('.range');

if (slider) rangeSlider();

//==========================================================================

// Фильтры товаров
//==========================================================================

import { filters } from './functions/filters.js';

const filtersBody = document.querySelector('.filters__body');

if (filtersBody) filters();

const { btnShow } = v;

if (btnShow) filters();

//==========================================================================

// Изменение темы
//==========================================================================

import { changeTheme } from './functions/change_theme.js';

changeTheme();

//==========================================================================

// Работа мобильных фильтров
//==========================================================================

import { mobileFilters } from './functions/mobile_filters.js';

const { popup } = v;

if (popup) mobileFilters();

//==========================================================================

// Загрузка основных свайперов
//==========================================================================

import { loadProductMain } from './functions/load_product_main.js';

const swipers = document.querySelectorAll('.swiper');

if (swipers) loadProductMain();

//==========================================================================

// Работа с корзиной
//==========================================================================

import { cart } from './functions/cart.js';

const { productsList } = v;

if (productsList) cart();

//==========================================================================

// Загрузка информации о продукте
//==========================================================================

import { loadInformationAboutProducts } from './functions/load_inf_product.js';

loadInformationAboutProducts();

//==========================================================================

// Свайперы
//==========================================================================

import { swiperWork } from './functions/swiper.js';

swiperWork();

//==========================================================================

// Валидация формы и отправка данных на почту через email.js
//==========================================================================

import { valid } from './functions/validationForm.js';

const form = document.querySelector('form');

if (form) valid(form);

//==========================================================================

// Поиск
//==========================================================================

import { search } from './functions/search_field.js';

search();

// Подгрузка карточек с товарами и сортировка
//==========================================================================

import { workWithProductsPage } from './functions/products.js';

const { catalogProducts } = v;

if (catalogProducts) workWithProductsPage();

//==========================================================================

// Логика для работы табов
//==========================================================================

import { tabs } from './functions/tabs.js';

const deliveryPayment = document.querySelector('.delivery-payment__body');

if (deliveryPayment) tabs();

//==========================================================================