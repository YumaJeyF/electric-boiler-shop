import Swiper,  { Scrollbar, Thumbs } from "swiper";
import v from '../_vars.js';

export const workTwoSwipers = () => {
    
    const { sliderFirst, sliderSecond } = v;

    // Два связанных слайдеры для страницы с товаром

    const swiperSec = new Swiper(sliderSecond, {
        modules: [ Scrollbar ],
        loop: true,
        spaceBetween: 16,
        slidesPerView: 3.6,
        freeMode: true,
         watchSlidesProgress: true,
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
        },
        breakpoints: {
            1200: {
                slidesPerView: 3.6
            },
            992: {
                slidesPerView: 3
            }
        }
    });
    
    const swiperFirst = new Swiper(sliderFirst, {
        modules: [Thumbs],
        loop: true,
        spaceBetween: 16,
        thumbs: {
            swiper: swiperSec,
        },
        breakpoints: {
            992: {
                slidesPerView: 1
            },
            100: {
                slidesPerView: 1.2
            }
        }
    });
}