const delayElement = document.getElementById('delay');
const sizeElement = document.getElementById('size');
const bubbleSortButton = document.querySelector('.bubble');
const visualizer = document.querySelector('.visualizer');
const playButton = document.querySelector('.play');
const pauseButton = document.querySelector('.pause');
const refreshButton = document.querySelector('.refresh');
const totalWidth = 720;
let arrayToSort = [];
let delay = 500;
let arrayLen = 50;
let sizeHasChanged = false;
let stats = 0;
delayElement.value = 1000 - delay;
sizeElement.value = arrayLen;
let elementWidth = calculateElementWidth();

delayElement.oninput = () => {
    delay = 1000 - delayElement.value
}

sizeElement.oninput = () => {
    arrayLen = sizeElement.value;
    elementWidth = calculateElementWidth();
    generateArray(arrayLen);
    sizeHasChanged = true;
}

function resetSettings() {
    arrayToSort = [];
    visualizer.innerHTML = '';
    stats = 0;
    sizeHasChanged = true;

}

function calculateElementWidth () {
    return (totalWidth / arrayLen) / 2;
 }

function generateArray(len) {
    resetSettings()
    for (let i = 0; i < len; i++) {
        const rand = Math.floor(Math.random() * 100) + 1
        arrayToSort.push(rand);
        createArrayElement(rand);
    }
}

function createArrayElement(val) {
    visualizer.style.gap = elementWidth + 'px';
    const arrayElement = document.createElement('div');
    arrayElement.className = 'array-element';
    arrayElement.style.height = val + '%';
    arrayElement.style.width = elementWidth + 'px';
    // arrayElement.innerText = val
    visualizer.appendChild(arrayElement);
}


async function bubbleSort () {
    let swapped = true;
    sizeHasChanged = false;
    const elements = document.querySelectorAll('.array-element');
    const arrayOfObject = createArrayOfObject(elements);
    let innerLoopLength = arrayOfObject.length;
    for (let i=0; i<arrayOfObject.length; i++) {
        swapped = false;
        for (let j=0; j<innerLoopLength - 1; j++) {
            if (sizeHasChanged) return;
            if (stats === 1) await pauser();
            changeTwoElementColor(arrayOfObject[j], arrayOfObject[j+1], '#0081a7')
            await pause(delay)
            if (stats === 1) await pauser();
           if (arrayToSort[j] > arrayToSort[j+1]) {
                changeTwoElementColor(arrayOfObject[j], arrayOfObject[j+1], '#95b27b')
                if (stats === 1) await pauser();
                translateTwoElement(arrayOfObject[j], arrayOfObject[j+1])
                await pause(delay)
                if (stats === 1) await pauser();
                swap(arrayOfObject, j, j+1);
                swap(arrayToSort, j, j+1)
                swapped = true;
           }
           if (stats === 1) await pauser();
           changeTwoElementColor(arrayOfObject[j], arrayOfObject[j+1], '#ee6c4d')
           if (stats === 1) await pauser();
        }
        if (!swapped) return;
        innerLoopLength--;
    }
}

function createArrayOfObject(elements) {
    const arrayOfObject = [];
    for (let i=0; i < elements.length; i++) {
        const object = {'element': elements[i], 'translateValue': 0, 'value' : arrayToSort[i]}
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
    firstElement.translateValue = firstElement.translateValue + (elementWidth*2);
    secondElement.translateValue = secondElement.translateValue - (elementWidth*2);
    const x = firstElement.translateValue;
    const y = secondElement.translateValue;
    firstElement.element.style.transform = `translate(${x}px)`
    secondElement.element.style.transform = `translate(${y}px)`
}

function swap (arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

const pause = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
function pauser() {
    return new Promise(resolve => {
        let playButtonClick = function() {
            playButton.removeEventListener('click', playButtonClick);
            stats = 0;
            resolve('resolved');
        }
        playButton.addEventListener('click', playButtonClick);
    })
}
pauseButton.addEventListener('click', function() {
    stats = 1;
})
refreshButton.addEventListener('click',() => {
    generateArray(arrayLen);
});
bubbleSortButton.addEventListener('click', bubbleSort);
window.addEventListener('load', (event) => {
    generateArray(arrayLen);
//     console.log(arrayToSort);
// selectionSort()
// console.log(arrayToSort);
})