# Sorting Visualizer

Sorting Visualizer is made primarily using [p5.js](https://p5js.org) and [React.js](https://reactjs.org). React is used for the main structure of the app and very minimal state management. The core of the app is really made using the p5.js library.

Main focus of the app was to make visualizing some of the most commonly used sorting algorithms as interactive as possible.

The app features:
- several different visualization patterns
- currently around 20 algorithms to choose from
- several array shuffle methods (e.g. almost sorted array)
- several interactive controls for as much control as possible
- and of course the main component, which is the drawing canvas

# The core idea

The core idea is the drawing technique. Originally the idea was to have an array of states where each state is an instance of the array after each array change. Now, the general idea is not bad for small arrays and for a relatively small number of swaps compared to the array size (up to a couple thousand). The issue arises with algorithms which do a lot of swaps while sorting, so even for small arrays, the number of swaps is substantial, so the memory used rises to Gigabytes, which is obviously a problem. A big improvement on this technique is to still keep an external array, but instead of saving an instance of the original array each time, we only save the elements at the indices which are being changed (most commonly, swapped). This is a massive improvement. Now instead of keeping an instance of the array for each state which would be up to 1000 elements per state, thus leading to huge memory usage, we only really keep a constant number of elements, usually one or two, sometimes three elements from the array per state. This cuts down the memory usage substantially.

# The controls

The app features a number of controls to make the visualization experience as interactive as possible:

- First and the most obvious one is the pause/play button, which enables the visualization to be paused or played at any point in the visualization.
- A reverse/forward button, which does what the name implies. It switches between forward and reverse playback.
- The Build Animations button might be the most mysterious one of all. It essentially just calls the sorting algorithm chosen, then while sorting the array, it saves the changes to the array at each step (for each visualization method differently) in a seperate array which is later then used to draw the array to the canvas.
- Auto-(re)build checkbox which, when checked, ensures the animations are automatically rebuilt after any change in the controls which affect the array.
- Number of elements slider, which simply sets the number of elements the array to be sorted should have.
- Frames per second slider. Controls the current framecount of the p5.js draw loop.
- Step slider, which sets the number of steps (one step being one change in the array) to be skipped after each frame.

# The app structure

The app is structured to have two main React components:
- Canvas
- Controls

## Canvas

This component is essentially just a canvas which is used through the P5Wrapper Component from the P5Wrapper package. The main `sketch` function with p5's `setup` and `draw` functions is implemented in this component. This function does most of the drawing.

This component hosts all of the app settings used by the controls (e.g. the original array of numbers to be sorted, the states array which constains all of the elements to be drawn to the screen, ...).

`randomize` is a function used to randomize the array given an input type through a parameter.

## Controls

This component contains all of the controls in the control panel of the app and function references to the onChange handlers for each control.

## Helper functions

Following are explanations of the helper functions used for algorithms.

<br />

`export const setValuesAtIndexes = (i, j) => {` - this function takes two indices as parameters and sets some attributes of the element at index `i` to the values of the same attributes of element at index `j`. These attributes represent the important attributes which affect the style of the element at index `i` (e.g. element height if it's a bar, or hue if it's a colored bar). 

Primarily used in insertion sorts.

<br />

`export const setValuesAtIndex = (i, element) => {` - this function takes an index and an element. It essentially does the same as the function `setValuesAtIndexes` except for using the element at index `j` it uses the element passed as an argument directly.

Primarily used in insertion sorts.

<br />

`export const mergeAtIndexes = (i, j) => {` - this function takes two indices as parameters and creates a new element instance with the essential attributes of the element at index `j` and the non-essential attributes of the element at index `i`. The essential attributes are those which can be changed during visualization (e.g. height of a barm or the y position of a dot in the scatter plot).

Primarily used in merge sorts.

<br />

`export const maxElement = () => {` - returns the greatest element of the `elements` array.

Primarily used in radix sorts.

<br />

`export const pushNewState = (accentIdxs = []) => {` - this function takes an array of accent indices (indices at which the element should be highilighted). In other words, it saves the elements from the given indices in a new *state* and pushes the state onto the states array, which is used for drawing.

<br />

`export const pushLastState = () => {` - since it is the last state, it's fine to save a reference of the entire original array, which is (when this function is called) sorted.

<br />

`export const swap = (arr, i, j) => {` - custom swap function to swap the essential attributes of two elements.

<br />

`export const midValue = (i1, i2, i3) => {` - receives three indices and returns the median of the three elements at those indices.

Used primarily to find a pivot value in quick sorts.

<br />


# Algorithms

Following is a list of the algorithms currently implemented:

- Counting Sorts
  - Radix Sort LSD Base 10
  - Radix Sort LSD Base 8
  - Radix Sort LSD Base 4
  - Radix Sort LSD Base 2
- Exchange Sorts
  - Bubble Sort
  - Gnome Sort
  - Comb Sort
  - Coctail Shaker Sort
- Selection Sorts
  - Selection Sort
  - Double Selection Sort
- Hybrid Sorts
  - Comb-gnome Sort
  - Quick-gnome Sort
  - Weave Merge Sort (merge-insertion)
- Distribution Sorts
  - Quick Sort LL Pointers
  - Quick Sort LR Pointers
  - Quick Sort Dual Pivot
- Merge Sorts
  - Merge Sort (out-of-place)
  - Merge Sort (in-place)
  - Bottom-up Merge Sort
- Insertion Sorts
  - Insertion Sort
  - Shell Sort
