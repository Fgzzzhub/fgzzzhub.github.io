function setCircleColor(element) {
  const currentColor = element.style.backgroundColor;
  const previousColor = element.getAttribute("data-previous-color");

  if (currentColor === "rgb(154, 154, 154)") {
    element.style.backgroundColor = previousColor;
  } else {
    element.setAttribute("data-previous-color", currentColor);
    element.style.backgroundColor = "#9a9a9a";
  }
}
