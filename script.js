// 🚨🚨 Slider 🚨🚨

// scaleSlider.style.transform = 'scale(0.3) translateX(-100%)';
// scaleSlider.style.overflow = 'visible';

// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i)}%)`) 👇 Refactor 1 function

// 🚨🚨 functions

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnRight = document.querySelector(".slider__btn--right");
  const btnLeft = document.querySelector(".slider__btn--left");
  const dotContainer = document.querySelector(".dots");
  let curSlide = 0;
  const maxSlide = slides.length;

  // Creatin dots under slides
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slid="${i}" ></button>`
      );
    });
  };

  const activeDots = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slid="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const slidePosition = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide with bottun

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    slidePosition(curSlide);
    activeDots(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    slidePosition(curSlide);
    activeDots(curSlide);
  };

  const init = function () {
    slidePosition(0);
    createDots();
    activeDots(0);
  };
  init();

  // 🚨🚨 Event handler
  btnRight.addEventListener("click", nextSlide);
  // if (curSlide === maxSlide - 1) {
  //   curSlide = 0;
  // } else {
  //   //curSlide = 1 ;
  //   curSlide++;
  // }
  // slidePosition(curSlide); refactor in 1 function ☝ out of event listener}
  btnLeft.addEventListener("click", prevSlide);

  // add event keyboard as event handler and this is reason why we created a separated function (nextSlide and prevSlide) we can use all place that
  document.addEventListener("keydown", function (e) {
    // e.key === 'ArrowLeft' && prevSlide();
    if (e.key === "ArrowLeft") prevSlide();
    // } else if (e.Key === 'ArrowRight') {
    //   nextSlide();
    // } instead we can use short circuting👇 work same top
    e.key === "ArrowRight" && nextSlide();
  });

  // Dots

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      // we can destructuring and get first element, right now that is have one class but next ...
      // console.log('j');
      const slide = e.target.dataset.slid;
      slidePosition(slide);
      activeDots(slide);
    }
  });
};
slider();
