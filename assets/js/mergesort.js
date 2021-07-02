 async function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    let mid = Math.floor(arr.length / 2);
    let left = await mergeSort(arr.slice(0, mid));
    let right = await mergeSort(arr.slice(mid)); 
    return await merge(left, right); 
}
async function merge(arr1, arr2) {
    let results = [];
    let i = 0;
    let j = 0;
    sizeHasChanged = false;
    changeColorHelper(arr1.concat(arr2), '0081a7')
    if (stats === 1) await pauser();
    while (i < arr1.length && j < arr2.length) {
        if (sizeHasChanged) return;
        if (arr1[i].value < arr2[j].value) {
            translateHelper(arr1[i], results.length, i)
            changeColorHelper(results, '95b27b')
            await pause(delay)
            if (stats === 1) await pauser();
            results.push(arr1[i]);
            i++;
        } else {
            translateHelper(arr2[j], results.length, j + arr1.length)
            changeColorHelper(results, '95b27b')
            await pause(delay)
            if (stats === 1) await pauser();
            results.push(arr2[j]);
            j++;
        }
    }
    while ( i < arr1.length) {
        if (sizeHasChanged) return
        translateHelper(arr1[i], results.length, i)
        changeColorHelper(results, '95b27b')
        await pause(delay)
        if (stats === 1) await pauser();
        results.push(arr1[i]);
        i++;
    }
    while ( j < arr2.length) {
        if (sizeHasChanged) return;
        translateHelper(arr2[j], results.length, j + arr1.length)
        changeColorHelper(results, '95b27b')
        await pause(delay)
        if (stats === 1) await pauser();
        results.push(arr2[j]);
        j++;
    }
        changeColorHelper(results, '95b27b')
        await pause(delay)
    if (stats === 1) await pauser();
    changeColorHelper(results, 'ee6c4d')
    return (results);
}
function mergeHelper() {
    const elements = document.querySelectorAll('.array-element');
    const arrayOfObject = createArrayOfObject(elements);
    mergeSort(arrayOfObject);

}

const mergeButton = document.querySelector('.Merge');
mergeButton.addEventListener('click', mergeHelper)

function translateHelper (element, firstIndex, lastIndex) {
    element.translateValue += elementWidth * 2 * (firstIndex - lastIndex);
    const x = element.translateValue;
    element.element.style.transform = `translateX(${x}px)`;
}

function changeColorHelper(arr, color) {
    for (let i = 0; i < arr.length ; i++) {
        arr[i].element.style.backgroundColor = "#" + color;
    }
}
