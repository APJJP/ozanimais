let swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    loop: true,
    grabCursor: true,

    autoplay: {
       delay: 6000, // tempo de espera
       disableOnInteraction: false, // permite que o autoplay continue mesmo se o usuário interagir com o swiprt
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
  
    /* navigation: {
       nextEl: '.swiper-button-next',
       prevEl: '.swiper-button-prev',
    }, */
})