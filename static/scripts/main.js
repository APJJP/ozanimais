// script para alterar nav ao SCROLL na página

window.addEventListener('scroll', function() {
  const header = document.querySelector('header')
  
  header.classList.toggle('scrolled', scrollY > 0)
})


let swiper1 = new Swiper('.swiper1', {
    loop: true,
    /* spaceBetween: 32, */
    grabCursor: true,

    autoplay: {
      delay: 6000, // tempo de espera
      disableOnInteraction: false, // permite que o autoplay continue mesmo se o usuário interagir com o swiprt
    },

    pagination: {
      el: '.swiper1 .swiper-pagination',
      clickable: true,
      /* dynamicBullets: true, */
      /* renderBullet: function (index, className) {
        return '<span class="' + className + '" style="width: 15px; height: 15px; color: #FE6651"></span>'
      }, */
    },
  
    /* navigation: {
      nextEl: '.swiper1 .swiper-button-next',
      prevEl: '.swiper1 .swiper-button-prev',
    }, */
  })



  let swiper2 = new Swiper('.swiper2', {
    loop: true,
    grabCursor: true,

    autoplay: {
      delay: 6000, // tempo de espera
      disableOnInteraction: false, // permite que o autoplay continue mesmo se o usuário interagir com o swiprt
    },

    pagination: {
      el: '.swiper2 .swiper-pagination',
      clickable: true,
    },
  
    navigation: {
      nextEl: '.swiper2 .swiper-button-next',
      prevEl: '.swiper2 .swiper-button-prev',
    },
  })