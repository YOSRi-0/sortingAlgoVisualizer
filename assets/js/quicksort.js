const quickButton = document.querySelector(".quick");

async function pivotHelper(array, start = 0, end = array.length - 1) {
  let pivot = array[start];
  let pivotIndex = start;
  sizeHasChanged = false;
  changeTwoElementColor(array[pivotIndex], null, "purple");
  if (stats === 1) await pauser();
  for (let i = start + 1; i <= end; i++) {
    if (sizeHasChanged) return;
    changeTwoElementColor(array[i], null, "#0081a7");
    if (stats === 1) await pauser();
    if (array[i].value < pivot.value) {
      pivotIndex++;
      translateTwoElementSelection(array[pivotIndex], array[i], i - pivotIndex);
      await pause(delay);
      if (stats === 1) await pauser();
      changeTwoElementColor(array[pivotIndex], array[i], "#95b27b");
      if (stats === 1) await pauser();
      swap(array, pivotIndex, i);
    }
    changeTwoElementColor(null, array[i], "#ee6c4d");
  }
  changeTwoElementColor(array[start], array[pivotIndex], "#95b27b");
  translateTwoElementSelection(
    array[start],
    array[pivotIndex],
    pivotIndex - start
  );
  await pause(delay);
  if (stats === 1) await pauser();
  changeTwoElementColor(array[start], array[pivotIndex], "#ee6c4d");

  swap(array, start, pivotIndex);
  return pivotIndex;
}

async function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIndex = await pivotHelper(arr, left, right); //3
    //left
    if (sizeHasChanged) return;
    await quickSort(arr, left, pivotIndex - 1);
    //right
    if (sizeHasChanged) return;
    await quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}

async function quickSortHelper() {
  const elements = document.querySelectorAll(".array-element");
  const arrayOfObject = createArrayOfObject(elements);
  await quickSort(arrayOfObject);
}

quickButton.addEventListener("click", async function () {
  const attr = document.createAttribute("highlight");
  disableButtons(true);
  addClickedAttribute(quickButton, attr);
  await quickSortHelper();
  disableButtons(false);
  removeClickedAttribute(quickButton, attr);
});

function addClickedAttribute(button, attr) {
  attr.value = "clicked";
  button.setAttributeNode(attr);
}

function removeClickedAttribute(button, attr) {
  button.removeAttributeNode(attr);
}
