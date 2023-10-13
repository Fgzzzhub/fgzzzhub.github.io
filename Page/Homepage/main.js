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

// let slideIndex = 0;
// showSlides();

// function showSlides() {
//   let i;
//   let slides = document.getElementsByClassName("mySlides");
//   let dots = document.getElementsByClassName("dots");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";  
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) {slideIndex = 1}    
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";  
//   dots[slideIndex-1].className += " active";
//   setTimeout(showSlides, 2000); // Change image every 2 seconds
// }