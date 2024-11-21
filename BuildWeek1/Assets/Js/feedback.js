const stars = document.querySelectorAll(".star");
const ratingInput = document.getElementById("rating");

stars.forEach((star, index) => {
  star.addEventListener("mouseover", () => {
    stars.forEach((s, i) => {
      if (i <= index) {
        s.classList.add("hovered");
      } else {
        s.classList.remove("hovered");
      }
    });
  });
  star.addEventListener("click", () => {
    stars.forEach((s, i) => {
      if (i <= index) {
        s.classList.add("starSelected");
      } else {
        s.classList.remove("starSelected");
      }
    });
  });
  star.addEventListener("mouseout", () => {
    stars.forEach((s) => {
      s.classList.remove("hovered");
    });
  });
});

/* ------------ BUTTON ------------ */

document.getElementById('info').addEventListener('click', function () {
  location.href = 'https://epicode.com/it/';
});

