const bubbleSortButton = document.querySelector('.bubble');



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


bubbleSortButton.addEventListener('click', bubbleSort);
