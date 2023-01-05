import React, { useState } from "react";
import { message } from "antd";

export const Algorithms = () => {
  const [arraySize, setArraySize] = useState(1);
  const [displaySpeed, setDisplaySpeed] = useState(1);
  const [animationSpeed, setAnimationSpeed] = useState(250);
  const [algorithmType, setAlgorithmType] = useState("Bubble Sort");
  const [disabled, setDisabled] = useState(false);
  const [array, setArray] = useState([]);
  const [arrayCopy, setArrayCopy] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [msg, setMsg] = useState("");
  const [unsortedArray, setUnsortedArray] = useState([12, 3, 55, 20, 4, 5]);
  const testing = async (msg, setMsg) => {
    message.info(msg);
    setMsg(msg);
    return true;
  };
};

export const testing = async (msg, setMsg) => {
  message.info(msg);
  setMsg(msg);
  return true;
};

function swapNumbers(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

// generates random number b/w min and max
export function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let sleep = (delay) => new Promise((resolve) => setInterval(resolve, delay));

export const resetArray = (newValue, setArray, setArrayCopy) => {
  const array = [];
  let length = newValue * 9;
  for (let i = 0; i < length; i++) {
    array.push(randomIntFromInterval(10, 330));
  }
  setArray(array);
  setArrayCopy(array);
  resetColors();
};

// resets the colors after reseting the array for the bars
export const resetColors = () => {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "red";
  }
};

// change color of bars to specific color
export const changeBarsColor = (color) => {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = `${color}`;
  }
};

// handles the change in array size from the slider
export const onChangeArraySize = (newValue, setArraySize) => {
  setArraySize(newValue);
  resetArray(newValue);
};

// handles the change in animation speed
export const onChangeDisplaySpeed = (
  newValue,
  setDisplaySpeed,
  setAnimationSpeed
) => {
  setDisplaySpeed(newValue);
  if (newValue === 1) {
    setAnimationSpeed(200);
    return;
  }
  if (newValue === 2) {
    setAnimationSpeed(150);
    return;
  }
  if (newValue === 3) {
    setAnimationSpeed(100);
    return;
  }
  if (newValue === 4) {
    setAnimationSpeed(50);
    return;
  }
  if (newValue === 5) {
    setAnimationSpeed(10);
    return;
  }
};

// handles the change in the algorithm type selected for sorting
export const onChangeAlgorithmType = (value, arraySize, setAlgorithmType) => {
  setAlgorithmType(value);
  message.info("Algorithm Changed to - " + value);
  resetArray(arraySize);
};

// ---------------------------
// Main Sorting Function
export const sort = async (
  algorithmType,
  array,
  animationSpeed,
  setDisabled,
  setArray
) => {
  setDisabled(true);
  if (algorithmType === "Bubble Sort") {
    await bubbleSort(array, animationSpeed, setArray);
    await sleep(500);
    setDisabled(false);
    return;
  }
  if (algorithmType === "Selection Sort") {
    selectionSort(array, animationSpeed, setArray);
    await sleep(500);
    setDisabled(false);
    return;
  }
  if (algorithmType === "Quick Sort") {
    quickSort(array, 0, array.length - 1, animationSpeed);
    await sleep(500);
    setDisabled(false);
    return;
  }
};

// ---------------------------
// Bubble Sort
export const bubbleSort = async (arr, animationSpeed, setArray) => {
  try {
    let tempArr = arr;
    const bars = document.getElementsByClassName("bar");
    let counter = 1;
    for (let i = 0; i < tempArr.length - 1; i++) {
      for (let j = 0; j < tempArr.length - i - 1; j++) {
        bars[j].style.backgroundColor = "blue";
        bars[j + 1].style.backgroundColor = "blue";
        await sleep(animationSpeed);

        if (tempArr[j] > tempArr[j + 1]) {
          console.log("swap - ", counter++);
          swapNumbers(tempArr, j, j + 1);
          bars[j].style.backgroundColor = "grey";
          bars[j + 1].style.backgroundColor = "grey";
          await sleep(animationSpeed);
        }
        bars[j].style.backgroundColor = "red";
        bars[j + 1].style.backgroundColor = "red";
        await sleep(animationSpeed);
        setArray([...tempArr]);
      }
      bars[tempArr.length - i - 1].style.backgroundColor = "green";
    }
    bars[0].style.backgroundColor = "green";

    console.log("Sorted array: ", tempArr);
  } catch (error) {
    message.error("Error: ", error);
  }
};

// ---------------------------
// Selection Sort
export const selectionSort = async (arr, animationSpeed, setArray) => {
  let tempArr = [...arr];
  let min_index;
  let min_num = tempArr[0];
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < tempArr.length; i++) {
    bars[i].style.backgroundColor = "blue";
    min_num = tempArr[i];
    min_index = i;
    for (let j = i; j < tempArr.length; j++) {
      bars[j].style.backgroundColor = "blue";
      await sleep(animationSpeed);
      if (tempArr[j] < min_num) {
        bars[min_index].style.backgroundColor = "blue";
        min_num = tempArr[j];
        min_index = j;
        bars[min_index].style.backgroundColor = "grey";
        bars[i].style.backgroundColor = "grey";
        await sleep(animationSpeed);
      }
    }
    swapNumbers(tempArr, min_index, i);
    setArray([...tempArr]);
    resetColors();
    bars[i].style.backgroundColor = "green";
    await sleep(animationSpeed);
  }
  changeBarsColor("green");
};

// ---------------------------
// Quick Sort
export const quickSort = async (arr, low, high, animationSpeed) => {
  if (low < high) {
    // pi is partitioning index, arr[p]
    // is now at right place
    let pi = partition(arr, low, high, animationSpeed); // Separately sort elements before // partition and after partition
    quickSort(arr, low, pi - 1, animationSpeed);
    quickSort(arr, pi + 1, high, animationSpeed);
  }
};

// for Quick sort
export const partition = async (arr, low, high, animationSpeed) => {
  // pivot
  const bars = document.getElementsByClassName("bar");
  let pivot = arr[high]; // Index of smaller element & indicates the right position of pivot found so far
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    // If current element is smaller than the pivot
    if (arr[j] < pivot) {
      // Increment index of smaller element
      i++;
      await sleep(animationSpeed);
      swapNumbers(arr, i, j);
    }
  }
  await sleep(animationSpeed);
  swapNumbers(arr, i + 1, high);
  return i + 1;
};

export const stopFunction = (setDisabled, setArray, arrayCopy) => {
  setDisabled(false);
  setArray(arrayCopy);
  resetColors();
};

const printArray = (arr) => {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str += arr[i];
    if (i != arr.length - 1) {
      str += ", ";
    }
  }
  return str;
};
