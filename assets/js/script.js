const delayElement = document.getElementById("delay");
const sizeElement = document.getElementById("size");
const visualizer = document.querySelector(".visualizer");
const playButton = document.querySelector(".play");
const pauseButton = document.querySelector(".pause");
const refreshButton = document.querySelector(".refresh");
let totalWidth = 720;
let arrayToSort = [];
let delay = 500;
let arrayLen = 50;
let sizeHasChanged = false;
let stats = 0;
delayElement.value = 1000 - delay;
sizeElement.value = arrayLen;
let elementWidth = calculateElementWidth();

function GetElementWidth() {
  if (window.innerWidth > 740) {
    totalWidth = 720;
    elementWidth = calculateElementWidth();
    generateArray(arrayLen);
  } else if (window.innerWidth <= 340) {
    totalWidth = 200;
    elementWidth = calculateElementWidth();
    generateArray(arrayLen);
  } else if (window.innerWidth <= 550) {
    totalWidth = 320;
    elementWidth = calculateElementWidth();
    generateArray(arrayLen);
  } else if (window.innerWidth <= 740) {
    totalWidth = 500;
    elementWidth = calculateElementWidth();
    generateArray(arrayLen);
  }
}

window.addEventListener("resize", GetElementWidth);

delayElement.oninput = () => {
  delay = 1000 - delayElement.value;
};

sizeElement.oninput = () => {
  arrayLen = sizeElement.value;
  elementWidth = calculateElementWidth();
  generateArray(arrayLen);
  sizeHasChanged = true;
};

function resetSettings() {
  arrayToSort = [];
  visualizer.innerHTML = "";
  stats = 0;
  sizeHasChanged = true;
}

function calculateElementWidth() {
  const elementWidth = Math.floor(totalWidth / arrayLen / 2);
  //   const elementWidth = totalWidth / arrayLen / 2;
  return elementWidth;
}

function generateArray(len) {
  resetSettings();
  for (let i = 0; i < len; i++) {
    const rand = Math.floor(Math.random() * 100) + 1;
    arrayToSort.push(rand);
    createArrayElement(rand);
  }
}

function createArrayElement(val) {
  // visualizer.style.gap = elementWidth + 'px';
  const arrayElement = document.createElement("div");
  arrayElement.className = "array-element";
  arrayElement.style.marginLeft = elementWidth / 2 + "px";
  arrayElement.style.marginRight = elementWidth / 2 + "px";
  arrayElement.style.height = val + "%";
  arrayElement.style.width = elementWidth + "px";
  // arrayElement.innerText = val
  visualizer.appendChild(arrayElement);
}

function createArrayOfObject(elements) {
  const arrayOfObject = [];
  for (let i = 0; i < elements.length; i++) {
    const object = {
      element: elements[i],
      translateValue: 0,
      value: arrayToSort[i],
    };
    arrayOfObject.push(object);
  }
  return arrayOfObject;
}

function changeTwoElementColor(firstElement, secondElement, color) {
  if (firstElement !== null) {
    firstElement.element.style.backgroundColor = color;
  }
  if (secondElement !== null) {
    secondElement.element.style.backgroundColor = color;
  }
}

function translateTwoElement(firstElement, secondElement) {
  firstElement.translateValue = firstElement.translateValue + elementWidth * 2;
  secondElement.translateValue =
    secondElement.translateValue - elementWidth * 2;
  const x = firstElement.translateValue;
  const y = secondElement.translateValue;
  firstElement.element.style.transform = `translate(${x}px)`;
  secondElement.element.style.transform = `translate(${y}px)`;
}

function translateTwoElementSelection(firstElement, secondElement, distance) {
  firstElement.translateValue =
    firstElement.translateValue + elementWidth * 2 * distance;
  secondElement.translateValue =
    secondElement.translateValue - elementWidth * 2 * distance;
  const x = firstElement.translateValue;
  const y = secondElement.translateValue;
  firstElement.element.style.transform = `translate(${x}px)`;
  secondElement.element.style.transform = `translate(${y}px)`;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

const pause = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
function pauser() {
  return new Promise((resolve) => {
    let playButtonClick = function () {
      playButton.removeEventListener("click", playButtonClick);
      stats = 0;
      resolve("resolved");
    };
    playButton.addEventListener("click", playButtonClick);
  });
}
pauseButton.addEventListener("click", function () {
  stats = 1;
});
refreshButton.addEventListener("click", () => {
  generateArray(arrayLen);
});

function translateHelper(element, firstIndex, lastIndex) {
  element.translateValue += elementWidth * 2 * (firstIndex - lastIndex);
  const x = element.translateValue;
  element.element.style.transform = `translateX(${x}px)`;
}

function changeColorHelper(arr, color) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].element.style.backgroundColor = "#" + color;
  }
}

window.addEventListener("load", (event) => {
  GetElementWidth();
  generateArray(arrayLen);
});

const getButtons = document.querySelectorAll(".btn-algo");

function disableButtons(isDisabled) {
  for (let button of getButtons) {
    button.disabled = isDisabled;
  }
}
