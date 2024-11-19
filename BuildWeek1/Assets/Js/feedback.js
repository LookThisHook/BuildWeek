const stars = document.querySelectorAll('.star');
const ratingInput = document.getElementById('rating');

stars.forEach((star, index) => {
  star.addEventListener('mouseover', () => {
    stars.forEach((s, i) => {
      if (i <= index) {
        s.classList.add('hovered');
      } else {
        s.classList.remove('hovered');
      }
    });
  });
  star.addEventListener('click', () => {
    stars.forEach((s, i) => {
      if (i <= index) {
        s.classList.add('selected');
      } else {
        s.classList.remove('selected');
      }
    });

  });
  star.addEventListener('mouseout', () => {
    stars.forEach((s) => {
      s.classList.remove('hovered');
    });
  });
});