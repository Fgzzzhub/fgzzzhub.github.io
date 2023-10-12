let title = document.querySelectorAll(".title");
let slide = document.querySelectorAll(".gallery");
let card = document.querySelectorAll(".card-kebudayaan");

window.onscroll = () => {
  //   title.forEach((sec) => {
  //     let top = window.scrollY;
  //     let offset = sec.offsetTop - 150;
  //     let height = sec.offsetHeight;

  //     if (top >= offset && top < offset + height) {
  //       sec.classList.add("show-animate");
  //     } else {
  //       sec.classList.remove("show-animate");
  //     }
  //   });

  //   slide.forEach((sec) => {
  //     let top = window.scrollY;
  //     let offset = sec.offsetTop - 150;
  //     let height = sec.offsetHeight;

  //     if (top >= offset && top < offset + height) {
  //       sec.classList.add("show-animate");
  //     } else {
  //       sec.classList.remove("show-animate");
  //     }
  //   });

  card.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 250;
    let height = sec.offsetHeight;

    if (top >= offset && top < offset + height) {
      sec.classList.add("show-animate");
    } else {
      sec.classList.remove("show-animate");
    }
  });
};
