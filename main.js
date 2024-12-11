//слайдер на главном экране
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");
const slides = document.querySelectorAll(".item");
const swiperPagination = document.querySelector(".slider-pagination");

let slideIndex = 1;
showSlides(slideIndex);

function plusSlide() {
  showSlides((slideIndex += 1));
}

function minusSlide() {
  showSlides((slideIndex -= 1));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "flex";

  updatePagination();
}

function updatePagination() {
  swiperPagination.innerHTML = "";
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.onclick = function () {
      currentSlide(i + 1);
    };
    dot.style.backgroundColor = i === slideIndex - 1 ? "black" : "lightgrey";
    swiperPagination.appendChild(dot);
  }
}
function handleResize() {
  if (window.innerWidth <= 480) {
    nextButton.style.display = "none";
    prevButton.style.display = "none";
    swiperPagination.style.display = "flex";
  } else {
    nextButton.style.display = "block";
    prevButton.style.display = "block";
    swiperPagination.style.display = "none";
  }
}
handleResize();

window.addEventListener("resize", handleResize);

nextButton.addEventListener("click", plusSlide);
prevButton.addEventListener("click", minusSlide);
// добавление в избранное
const favoriteButtons = document.querySelectorAll(".favoriteButton");

favoriteButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const heartImage = this.querySelector(".heart");
    heartImage.classList.toggle("red");
  });
});
//слайдер блоке Новинки
const swiper = new Swiper(".swiper-container", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: false,
  slidesPerView: 4,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
  },
  breakpoints: {
    744: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
  },
  breakpoints: {
    1200: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
  breakpoints: {
    1440: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
});
document.querySelector(".custom-button-next").addEventListener("click", () => {
  swiper.slideNext();
});

document.querySelector(".custom-button-prev").addEventListener("click", () => {
  swiper.slidePrev();
});

// popup
const popupBg = document.querySelector(".popup__bg");
const closeButton = document.querySelector(".close-button");
const openButton = document.querySelector(".open-popup");
const submitButton = document.getElementById("submit");
const form = document.getElementById("form");
openButton.addEventListener("click", function () {
  openPopup();
  popupBg.classList.remove("hidden");
});

closeButton.addEventListener("click", function () {
  closePopup();
  popupBg.classList.add("hidden");
});
function openPopup() {
  popupBg.style.display = "flex";
}

function closePopup() {
  popupBg.style.display = "none";
}

popupBg.addEventListener("click", function (event) {
  if (event.target === popupBg) {
    closePopup();
  }
});
// Функция для проверки формы
function checkForm() {
  const isEmpty = Array.from(form.elements).some((input) => {
    return (
      input.tagName === "INPUT" &&
      input.type !== "submit" &&
      input.value.trim() === ""
    );
  });
  submitButton.disabled = isEmpty;
}

form.addEventListener("input", checkForm);
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  form.reset();
  alert("Данные отправлены");
  closePopup();
});
