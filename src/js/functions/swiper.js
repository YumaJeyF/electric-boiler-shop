import Swiper,  { Navigation, Autoplay } from "swiper";

export const swiperWork = () => {
    const slider = document.querySelector('.swiper-company');

    const swiper = new Swiper(slider, {
        modules: [ Navigation, Autoplay ],
        slidesPerView: 8,
        loop: true,
        spaceBetween: 16,
        speed: 1000,
        autoplay: {
            delay: 2000,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1366: {
                slidesPerView: 8
            },
            1100: {
                slidesPerView: 7
            },
            950: {
                slidesPerView: 6
            },
            643: {
                slidesPerView: 5
            },
            507: {
                slidesPerView: 4
            },
            390: {
                slidesPerView: 3
            },
            200: {
                slidesPerView: 2
            }
        }
    });

    const slidersProducts = document.querySelectorAll('.swiper-products');

    slidersProducts.forEach(slider => {
        const swiperProduct = new Swiper(slider, {
            slidesPerView: 4,
            spaceBetween: 16,
            loop: true,
            modules: [ Autoplay ],
            speed: 1500,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false
            },
            breakpoints: {
                992: {
                    slidesPerView: 4
                },
                768: {
                    slidesPerView: 3
                },
                320: {
                    spaceBetween: 16,
                    slidesPerView: 2
                },
                200: {
                    slidesPerView: 1,
                    spaceBetween: 8
                }
            }
        });
    })

    // Слайдер 'Вам понравится'

    const sliderForProductsLiked = document.querySelector('.liked-it__swiper');

    const swiperLiked = new Swiper(sliderForProductsLiked, {
        modules: [ Autoplay ],
        slidesPerView: 5,
        spaceBetween: 16,
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 2000,
        },
        breakpoints: {
            992: {
                slidesPerView: 5
            },
            768: {
                slidesPerView: 4
            },
            590: {
                slidesPerView: 3,
            },
            490: {
                spaceBetween: 16
            },
            317: {
                slidesPerView: 2
            },
            100: {
                slidesPerView: 1,
                spaceBetween: 8
            }
        }
    });
}