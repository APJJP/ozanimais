let swiper = new Swiper('.swiper', {
    loop: true,
    /* spaceBetween: 32, */
    grabCursor: true,

    autoplay: {
      delay: 6000, // tempo de espera
      disableOnInteraction: false, // permite que o autoplay continue mesmo se o usuário interagir com o swiprt
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      /* dynamicBullets: true, */
      /* renderBullet: function (index, className) {
        return '<span class="' + className + '" style="width: 15px; height: 15px; color: #FE6651"></span>'
      }, */
    },
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })