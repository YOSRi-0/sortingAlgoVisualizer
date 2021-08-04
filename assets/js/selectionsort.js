
const selectionButton = document.querySelector('.selection')

async function selectionSort() {
    let swapped = true;
    sizeHasChanged = false;
    const elements = document.querySelectorAll('.array-element');
    const arrayOfObject = createArrayOfObject(elements);
    for (let i=0; i<arrayToSort.length; i++) {
        let lowest = i;
        changeTwoElementColor(arrayOfObject[i], null, '#0081a7');
        if (stats === 1) await pauser();
        await pause(delay)
        for (let j=i+1; j<arrayToSort.length; j++) {
            changeTwoElementColor(arrayOfObject[j], null, '#0081a7')
            if (stats === 1) await pauser();
            await pause(delay)
            if (sizeHasChanged) return;
            if (arrayToSort[j] < arrayToSort[lowest]) {
                if (lowest != i) {
                    changeTwoElementColor(arrayOfObject[lowest], null, '#ee6c4d')
                }
                // await pause(delay)
                lowest = j;
                if (stats === 1) await pauser();
                changeTwoElementColor(arrayOfObject[lowest], null, '#95b27b')
                if (stats === 1) await pauser();
            }
                // await pause(delay)
                if (stats === 1) await pauser();
                changeTwoElementColor(arrayOfObject[j], null, '#ee6c4d')
                if (stats === 1) await pauser();
        }
        
        if (i !== lowest) {
            translateTwoElementSelection(arrayOfObject[i], arrayOfObject[lowest], lowest - i)
            // await pause(delay)
            swap(arrayToSort, i, lowest);
            swap(arrayOfObject, i, lowest);
            if (stats === 1) await pauser();
        }
            changeTwoElementColor(arrayOfObject[i], arrayOfObject[lowest], '#ee6c4d')
            if (stats === 1) await pauser();
            // await pause(delay)
    }
}




selectionButton.addEventListener("click", async function () {
  const attr = document.createAttribute("highlight");
  disableButtons(true);
  addClickedAttribute(selectionButton, attr);
  await selectionSort();
  disableButtons(false);
  removeClickedAttribute(selectionButton, attr);
});

function addClickedAttribute(button, attr) {
  attr.value = "clicked";
  button.setAttributeNode(attr);
}

function removeClickedAttribute(button, attr) {
  button.removeAttributeNode(attr);
}