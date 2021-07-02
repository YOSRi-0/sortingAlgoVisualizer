const insertionButton = document.querySelector('.insertion')

async function insertionSort() {
    sizeHasChanged = false;
    const elements = document.querySelectorAll('.array-element');
    const arrayOfObject = createArrayOfObject(elements);
    for (let i=1; i < arrayToSort.length; i++) {
        let currentValue = arrayToSort[i];
        let currentElement = arrayOfObject[i];
        changeTwoElementColor(currentElement, null, '#95b27b');
        await pause(delay);
        if (stats === 1) await pauser();
        for (var j = i - 1; j > -1 && arrayToSort[j] > currentValue; j--) {
            if (sizeHasChanged) return;
            changeTwoElementColor(arrayOfObject[j], null, '#0081a7')
            await pause(delay)
            if (stats === 1) await pauser();
            arrayToSort[j+1] = arrayToSort[j];
            translateTwoElement(arrayOfObject[j], arrayOfObject[j+1])
            if (stats === 1) await pauser();
            swap(arrayOfObject, j, j+1);
            changeTwoElementColor(arrayOfObject[j+1], null, '#ee6c4d')
        }
        arrayToSort[j+1] = currentValue;
        if (stats === 1) await pauser();

        changeTwoElementColor(currentElement, null, '#ee6c4d')
        if (stats === 1) await pauser();
    }
}
insertionButton.addEventListener('click', insertionSort)