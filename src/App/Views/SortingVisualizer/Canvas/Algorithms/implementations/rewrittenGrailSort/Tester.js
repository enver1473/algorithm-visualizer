import { count, elements } from '../../../Canvas';

import GrailComparator from './GrailComparator';
import GrailPair from './GrailPair';
import GrailSort from './GrailSort';

/*
 * MIT License
 *
 * Copyright (c) 2013 Andrey Astrelin
 * Copyright (c) 2020 The Holy Grail Sort Project
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * The Holy Grail Sort Project
 * Project Manager:      Summer Dragonfly
 * Project Contributors: 666666t
 *                       Anonymous0726
 *                       aphitorite
 *                       dani_dlg
 *                       EilrahcF
 *                       Enver
 *                       lovebuny
 *                       MP
 *                       phoenixbound
 *                       thatsOven
 *
 * Special thanks to "The Studio" Discord community!
 */

// REWRITTEN GRAILSORT FOR JAVASCRIPT - A heavily refactored C/C++-to-JavaScript version of
//                                      Andrey Astrelin's GrailSort.h, aiming to be as
//                                      readable and intuitive as possible.
//
// ** Written and maintained by The Holy Grail Sort Project
//
// Primary author: Enver
//
// Current status: Finished. Potentially 100% working... Passing most tests, some tests capped by V8 Engine memory allocation limits

const getTimestamp = function () {
  return new Date().getTime();
};

const elementsArrFromArr = (array, len) => {
  for (let i = 0; i < len; i++) {
    array[i] = new GrailPair(i, elements[i].getValue());
  }
}

const rewrittenGrailSort = (grailBufferType = 0) => {
  let comp = new GrailComparator();
  let grail = new GrailSort(comp);

  let buffer = null;
  let bufferLen = 0;

  let array = new Array(count);

  elementsArrFromArr(array, count);

  // Grailsort with static buffer
  if (grailBufferType === 1) {
    buffer = new Array(GrailSort.GRAIL_STATIC_EXT_BUF_LEN);
    bufferLen = GrailSort.GRAIL_STATIC_EXT_BUF_LEN;
  }
  // Grailsort with dynamic buffer
  else if (grailBufferType === 2) {
    bufferLen = 1;
    while (bufferLen * bufferLen < count) {
      bufferLen *= 2;
    }
    buffer = new Array(bufferLen);
  }

  let start = getTimestamp();
  grail.grailCommonSort(array, 0, count, buffer, bufferLen);
  let time = getTimestamp() - start;
  console.log(time);
};

export { rewrittenGrailSort };
