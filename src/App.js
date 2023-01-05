import "./App.scss";
import { Slider, Select, Button, message } from "antd";
import { useEffect, useState } from "react";

// -------------------
// SORTING ALGORITHMS
// -------------------

// Main App Function
function App() {
  let arr = [10, 7, 8, 9, 1, 5];
  let arrayoneLength = arr.length;

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
  const referenceLinks = {
    "Bubble Sort": "https://www.geeksforgeeks.org/bubble-sort/?ref=lbp",
    "Selection Sort": "https://www.geeksforgeeks.org/selection-sort/?ref=lbp",
    "Quick Sort": "https://www.geeksforgeeks.org/quick-sort/?ref=lbp",
    "Merge Sort": "https://www.geeksforgeeks.org/merge-sort/?ref=lbp",
  };
  useEffect(() => {
    resetArray(1);
  }, []);

  function swapNumbers(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  // generates random number b/w min and max
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  let sleep = (delay) => new Promise((resolve) => setInterval(resolve, delay));

  const resetArray = (newValue) => {
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
  const resetColors = () => {
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "red";
    }
  };

  // change color of bars to specific color
  const changeBarsColor = (color) => {
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = `${color}`;
    }
  };

  // handles the change in array size from the slider
  const onChangeArraySize = (newValue) => {
    setArraySize(newValue);
    resetArray(newValue);
  };

  // handles the change in animation speed
  const onChangeDisplaySpeed = (newValue) => {
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
  const onChangeAlgorithmType = (value, arraySize) => {
    setAlgorithmType(value);
    message.info("Algorithm Changed to - " + value);
    resetArray(arraySize);
  };

  // ---------------------------
  // Main Sorting Function
  const sort = async (algorithmType, array, animationSpeed) => {
    setDisabled(true);
    if (algorithmType === "Bubble Sort") {
      await bubbleSort(array, animationSpeed, setArray);
      await sleep(500);
      setDisabled(false);
      return;
    }
    if (algorithmType === "Selection Sort") {
      await selectionSort(array, animationSpeed, setArray);
      await sleep(500);
      setDisabled(false);
      return;
    }
    if (algorithmType === "Quick Sort") {
      await quickSort(array, 0, array.length - 1, animationSpeed);
      changeBarsColor("green");
      await sleep(500);
      setDisabled(false);
      return;
    }
    if (algorithmType === "Merge Sort") {
      await mergeSort(array, 0, array.length - 1, animationSpeed);
      changeBarsColor("green");
      await sleep(500);
      setDisabled(false);
      return;
    }
  };

  // Bubble Sort
  const bubbleSort = async (arr, animationSpeed) => {
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
    } catch (error) {
      message.error("Error: ", error);
    }
  };

  // Selection Sort
  const selectionSort = async (arr, animationSpeed) => {
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
      for (let k = i; k < bars.length; k++) {
        bars[k].style.backgroundColor = "red";
      }
      bars[i].style.backgroundColor = "green";
      await sleep(animationSpeed);
    }
  };

  // Quick Sort
  const quickSort = async (arr, low, high, animationSpeed) => {
    if (low < high) {
      // pi is partitioning index, arr[p]
      // is now at right place
      let pi = await partition(arr, low, high, animationSpeed);
      // Separately sort elements before partition and after partition
      await quickSort(arr, low, pi - 1, animationSpeed);
      await quickSort(arr, pi + 1, high, animationSpeed);
    }
  };
  // for Quick sort
  const partition = async (arr, low, high, animationSpeed) => {
    const bars = document.getElementsByClassName("bar");
    let pivot = arr[high];
    await sleep(animationSpeed);
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
      if (arr[j] < pivot) {
        bars[j].style.backgroundColor = "grey";
        bars[high].style.backgroundColor = "grey";
        i++;
        await sleep(animationSpeed);
        swapNumbers(arr, i, j);
        bars[j].style.backgroundColor = "green";
        setArray([...arr]);
      }
    }
    await sleep(animationSpeed);
    swapNumbers(arr, i + 1, high);
    await sleep(animationSpeed);

    bars[high].style.backgroundColor = "blue";

    setArray([...arr]);

    return i + 1;
  };

  // Merge Sort
  const mergeSort = async (arr, l, r, animationSpeed) => {
    if (l >= r) {
      return;
    }
    var m = l + parseInt((r - l) / 2);
    await mergeSort(arr, l, m, animationSpeed);
    await mergeSort(arr, m + 1, r, animationSpeed);
    await merge(arr, l, m, r, animationSpeed);
  };
  // for Merge sort
  const merge = async (arr, l, m, r, animationSpeed) => {
    const bars = document.getElementsByClassName("bar");
    await sleep(animationSpeed);

    var n1 = m - l + 1;
    var n2 = r - m;
    // Create temp arrays
    var L = new Array(n1);
    var R = new Array(n2);
    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++) {
      L[i] = arr[l + i];
      await sleep(animationSpeed);
      bars[i].style.backgroundColor = "blue";
    }
    for (var j = 0; j < n2; j++) {
      R[j] = arr[m + 1 + j];
      await sleep(animationSpeed);
      bars[i].style.backgroundColor = "yellow";
    }

    // Merge the temp arrays back into arr[l..r]
    // Initial index of first subarray
    var i = 0;
    // Initial index of second subarray
    var j = 0;
    // Initial index of merged subarray
    var k = l;
    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        await sleep(animationSpeed);
        bars[i].style.backgroundColor = "grey";
        bars[j].style.backgroundColor = "grey";
        arr[k] = L[i];
        setArray([...arr]);
        i++;
      } else {
        await sleep(animationSpeed);
        bars[i].style.backgroundColor = "grey";
        bars[j].style.backgroundColor = "grey";
        arr[k] = R[j];
        setArray([...arr]);
        j++;
      }
      bars[i].style.backgroundColor = "red";
      bars[j].style.backgroundColor = "red";
      k++;
    }
    // Copy the remaining elements of // L[], if there are any
    while (i < n1) {
      bars[k].style.backgroundColor = "blue";
      await sleep(animationSpeed);
      arr[k] = L[i];
      setArray([...arr]);
      i++;
      k++;
    } // Copy the remaining elements of // R[], if there are any
    while (j < n2) {
      bars[k].style.backgroundColor = "yellow";
      await sleep(animationSpeed);
      arr[k] = R[j];
      setArray([...arr]);
      j++;
      k++;
    }
  };

  const stopFunction = () => {
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

  return (
    <div className="App">
      <h1 className="topHeading">Algorithms Visualizer</h1>
      {/*  Algorithms  */}
      <div className="container">
        <div className="leftSide">
          <div className="section">
            <h2>Algorithms </h2>
          </div>
          <div className="section">
            <h3>Array Size - {arraySize}</h3>
            <Slider
              min={1}
              max={5}
              onChange={(value) => onChangeArraySize(value, setArraySize)}
              disabled={disabled}
              value={typeof arraySize === "number" ? arraySize : 0}
            />
          </div>
          <div className="section">
            <h3>Animation Speed - x{displaySpeed}</h3>
            <Slider
              min={1}
              max={5}
              onChange={(value) =>
                onChangeDisplaySpeed(value, setDisplaySpeed, setAnimationSpeed)
              }
              disabled={disabled}
              value={typeof displaySpeed === "number" ? displaySpeed : 0}
            />
          </div>
          <div className="section">
            <h3>Algorithm For Sorting</h3>
            <Select
              defaultValue="Bubble Sort"
              style={{
                width: 200,
              }}
              disabled={disabled}
              onChange={(value) =>
                onChangeAlgorithmType(value, arraySize, setAlgorithmType)
              }
              options={[
                {
                  value: "Bubble Sort",
                  label: "Bubble Sort",
                },
                {
                  value: "Selection Sort",
                  label: "Selection Sort",
                },
                {
                  value: "Quick Sort",
                  label: "Quick Sort",
                },
                {
                  value: "Merge Sort",
                  label: "Merge Sort",
                },
              ]}
            />
          </div>
          <div className="buttonSection">
            <Button
              type="primary"
              onClick={() => {
                resetArray(arraySize, setArray, setArrayCopy);
              }}
              disabled={disabled}
            >
              Generate Array
            </Button>
            <Button
              onClick={() =>
                sort(
                  algorithmType,
                  array,
                  animationSpeed,
                  setDisabled,
                  setArray
                )
              }
              disabled={disabled}
            >
              Sort
            </Button>
          </div>
        </div>
        <div className="rightSide">
          <div className="heading">
            <h2>Data Visualisation</h2>
          </div>
          <div className="barsVisualisation">
            {array.map((value, key) => (
              <div
                className="bar"
                key={`${key}`}
                style={{ height: `${value}px` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      {(() => {
        switch (algorithmType) {
          case "Bubble Sort":
            return (
              <div className="algorithmDescription">
                <div className="descriptionHeading">
                  <h1>{algorithmType} Algorithm</h1>
                </div>
                <div className="description">
                  <p>
                    Bubble Sort is the simplest sorting algorithm that works by
                    repeatedly swapping the adjacent elements if they are in the
                    wrong order. This algorithm is not suitable for large data
                    sets as its average and worst-case time complexity is quite
                    high. (
                    <a href={`${referenceLinks[algorithmType]}`}>Reference</a>)
                  </p>
                  <p className="complexites">
                    Time Complexity: O(N<sup>2</sup>)
                  </p>
                  <p className="complexites">Auxiliary Space: O(1)</p>
                  <h3> Worst Case Analysis for Bubble Sort</h3>
                  <p>
                    The worst-case condition for bubble sort occurs when
                    elements of the array are arranged in decreasing order. In
                    the worst case, the total number of iterations or passes
                    required to sort a given array is (n-1). where 'n' is a
                    number of elements present in the array.
                  </p>
                </div>
              </div>
            );
          case "Selection Sort":
            return (
              <div className="algorithmDescription">
                <div className="descriptionHeading">
                  <h1>{algorithmType} Algorithm</h1>
                </div>
                <div className="description">
                  <p>
                    Selection sort algorithm sorts an array by repeatedly
                    finding the minimum element (considering ascending order)
                    from the unsorted part and putting it at the beginning. The
                    algorithm maintains two subarrays in a given array
                    <ol>
                      <li>The subarray which already sorted.</li>
                      <li>
                        The remaining subarray was unsorted. (
                        <a href={`${referenceLinks[algorithmType]}`}>
                          Reference
                        </a>
                        )
                      </li>
                    </ol>
                  </p>
                  <p className="complexites">
                    Time Complexity: O(N<sup>2</sup>)
                  </p>
                  <p className="complexites">Auxiliary Space: O(1)</p>
                </div>
              </div>
            );
          case "Quick Sort":
            return (
              <div className="algorithmDescription">
                <div className="descriptionHeading">
                  <h1>{algorithmType} Algorithm</h1>
                </div>
                <div className="description">
                  <p>
                    Like Merge Sort, QuickSort is a Divide and Conquer
                    algorithm. It picks an element as a pivot and partitions the
                    given array around the picked pivot. There are many
                    different versions of quickSort that pick pivot in different
                    ways.
                    <ol>
                      <li>Always pick the first element as a pivot.</li>
                      <li>
                        Always pick the last element as a pivot (implemented
                        below)
                      </li>
                      <li>Pick a random element as a pivot.</li>
                      <li>Pick median as the pivot. </li>
                    </ol>
                    The key process in quickSort is a partition(). The target of
                    partitions is, given an array and an element x of an array
                    as the pivot, put x at its correct position in a sorted
                    array and put all smaller elements (smaller than x) before
                    x, and put all greater elements (greater than x) after x.
                    All this should be done in linear time.(
                    <a href={`${referenceLinks[algorithmType]}`}>Reference</a>)
                  </p>
                  <p className="complexites">
                    Time Complexity: T(n) = T(k) + T(n-k-1) + &Theta;(n)
                  </p>
                </div>
              </div>
            );
          case "Merge Sort":
            return (
              <div className="algorithmDescription">
                <div className="descriptionHeading">
                  <h1>{algorithmType} Algorithm</h1>
                </div>
                <div className="description">
                  <p>
                    The Merge Sort algorithm is a sorting algorithm that is
                    based on the Divide and Conquer paradigm. In this algorithm,
                    the array is initially divided into two equal halves and
                    then they are combined in a sorted manner.
                    <br></br>
                    <h3>Merge Sort Process</h3>
                    Think of it as a recursive algorithm continuously splits the
                    array in half until it cannot be further divided. This means
                    that if the array becomes empty or has only one element
                    left, the dividing will stop, i.e. it is the base case to
                    stop the recursion. If the array has multiple elements,
                    split the array into halves and recursively invoke the merge
                    sort on each of the halves. Finally, when both halves are
                    sorted, the merge operation is applied. Merge operation is
                    the process of taking two smaller sorted arrays and
                    combining them to eventually make a larger one.(
                    <a href={`${referenceLinks[algorithmType]}`}>Reference</a>)
                  </p>
                  <p className="complexites">Time Complexity: O(N log(N))</p>
                  <p className="complexites">Auxiliary Space: O(n)</p>
                </div>
              </div>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default App;
