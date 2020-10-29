import { swap, pushNewState, pushLastState } from '../../helperFunctions';
import SmartGnomeSort from './smartGnomeSort';
import { count, elements } from '../../../Canvas';

/*
 * 
The MIT License (MIT)

Copyright (c) 2013 Andrey Astrelin

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

/********* Grail sorting *********************************/
/*                                                       */
/* (c) 2013 by Andrey Astrelin                           */
/* Refactored by MusicTheorist                           */
/*                                                       */
/* Stable sorting that works in O(N*log(N)) worst time   */
/* and uses O(1) extra memory                            */
/*                                                       */
/* Define int / SortComparator                           */
/* and then call GrailSort() function                    */
/*                                                       */
/* For sorting w/ fixed external buffer (512 items)      */
/* use GrailSortWithBuffer()                             */
/*                                                       */
/* For sorting w/ dynamic external buffer (sqrt(length)) */
/* use GrailSortWithDynBuffer()                          */
/*                                                       */
/*********************************************************/

let bufferType = 0;

class GrailPair {
  constructor(len, frag) {
    this.leftOverLen = len;
    this.leftOverFrag = frag;
  }
  
  getLeftOverLen() {
    return this.leftOverLen;
  }
  
  getLeftOverFrag() {
    return this.leftOverFrag;
  }
}

function compare(a, b) {
  const elementA = a.getValue();
  const elementB = b.getValue();

  let value = 0;
  if (elementA > elementB)      value =  1;
  else if (elementA < elementB) value = -1;
  else                          value =  0;
  
  return value;
}

function write(array, at, equals) {
  array[at] = equals.copy();
}

function arraycopy(src, srcPos, dest, destPos, length) {
  for(let i = 0; i < length; i++) {
    write(dest, destPos + i, src[srcPos + i]);
  }
}

let grailInsertSorter;
const grailStaticBufferLen = 32;

export function getStaticBuffer() {
    return grailStaticBufferLen;
}

function grailSwap(arr, a, b) {
  pushNewState([a, b]);
  swap(arr, a, b);
  pushNewState([a, b]);
}

function grailMultiSwap(arr, a, b, swapsLeft) {        
    while(swapsLeft !== 0) { 
        grailSwap(arr, a++, b++);
        swapsLeft--;
    }
}

function grailRotate(array, pos, lenA, lenB) {
    while(lenA !== 0 && lenB !== 0) {
        if(lenA <= lenB) {
            grailMultiSwap(array, pos, pos + lenA, lenA);
            pos += lenA;
            lenB -= lenA;
        } 
        else {
            grailMultiSwap(array, pos + (lenA - lenB), pos + lenA, lenB);
            lenA -= lenB;
        }
    }
}

function grailInsertSort(arr, pos, len) {
    grailInsertSorter.customSort(arr, pos, len);
}

//boolean argument determines direction
function grailBinSearch(arr, pos, len, keyPos, isLeft) {
    let left = -1, right = len;
    while(left < right - 1) {
        let mid = left + ((right - left) >> 1);
        if(isLeft) {
            if(compare(arr[pos + mid], arr[keyPos]) >= 0) {
                right = mid;
            } else {
                left = mid;
            }
        } else {
            if(compare(arr[pos + mid], arr[keyPos]) > 0) {
                right = mid;
            } else left = mid;
        }
        pushNewState([pos + mid]);
    }
    return right;
}

// cost: 2 * len + numKeys^2 / 2
function grailFindKeys(arr, pos, len, numKeys) {
    let dist = 1, foundKeys = 1, firstKey = 0;  // first key is always here

    while(dist < len && foundKeys < numKeys) {
        //Binary Search left
        let loc = grailBinSearch(arr, pos + firstKey, foundKeys, pos + dist, true);
        if(loc === foundKeys || compare(arr[pos + dist], arr[pos + (firstKey + loc)]) !== 0) {
            grailRotate(arr, pos + firstKey, foundKeys, dist - (firstKey + foundKeys));
            firstKey = dist - foundKeys;
            grailRotate(arr, pos + (firstKey + loc), foundKeys - loc, 1);
            foundKeys++;
        }
        dist++;
    }
    grailRotate(arr, pos, firstKey, foundKeys);
    
    
    return foundKeys;
}

// cost: min(len1, len2)^2 + max(len1, len2)
function grailMergeWithoutBuffer(arr, pos, len1, len2) {
    if(len1 < len2) {
        while(len1 !== 0) {
            //Binary Search left
            let loc = grailBinSearch(arr, pos + len1, len2, pos, true);
            if(loc !== 0) {
                grailRotate(arr, pos, len1, loc);
                pos += loc;
                len2 -= loc;
            }
            if(len2 === 0) break;
            do {
                pos++;
                len1--;
            } while(len1 !== 0 && compare(arr[pos], arr[pos + len1]) <= 0);
        }
    } else {
        while(len2 !== 0) {
            //Binary Search right
            let loc = grailBinSearch(arr, pos, len1, pos + (len1 + len2 - 1), false);
            if(loc !== len1) {
                grailRotate(arr, pos + loc, len1 - loc, len2);
                len1 = loc;
            }
            if(len1 === 0) break;
            do {
                len2--;
            } while(len2 !== 0 && compare(arr[pos + len1 - 1], arr[pos + len1 + len2 - 1]) <= 0);
        }
    }
}

// arr - starting array. arr[0 - regBlockLen..-1] - buffer (if havebuf).
// regBlockLen - length of regular blocks. First blockCount blocks are stable sorted by 1st elements and key-coded
// keysPos - arrays of keys, in same order as blocks. keysPos < midkey means stream A
// aBlockCount are regular blocks from stream A.
// lastLen is length of last (irregular) block from stream B, that should go before nblock2 blocks.
// lastLen = 0 requires aBlockCount = 0 (no irregular blocks). lastLen > 0, aBlockCount = 0 is possible.
function grailMergeBuffersLeft(arr, keysPos, midkey, pos, 
        blockCount, blockLen, havebuf, aBlockCount, 
        lastLen) {

    if(blockCount === 0) {
        let aBlocksLen = aBlockCount * blockLen;
        if(havebuf) grailMergeLeft(arr, pos, aBlocksLen, lastLen, 0 - blockLen);
        else grailMergeWithoutBuffer(arr, pos, aBlocksLen, lastLen);
        return;
    }

    let leftOverLen = blockLen;
    let leftOverFrag = compare(arr[keysPos], arr[midkey]) < 0 ? 0 : 1;
    let processIndex = blockLen;
    let restToProcess;

    for(let keyIndex = 1; keyIndex < blockCount; keyIndex++, processIndex += blockLen) {
        restToProcess = processIndex - leftOverLen;
        let nextFrag = compare(arr[keysPos + keyIndex], arr[midkey]) < 0 ? 0 : 1;

        if(nextFrag === leftOverFrag) {
            if(havebuf) grailMultiSwap(arr, pos + restToProcess - blockLen, pos + restToProcess, leftOverLen);
            restToProcess = processIndex;
            leftOverLen = blockLen;
        } else {
            if(havebuf) {
                let results = grailSmartMergeWithBuffer(arr, pos + restToProcess, leftOverLen, leftOverFrag, blockLen);
                leftOverLen = results.getLeftOverLen();
                leftOverFrag = results.getLeftOverFrag();
            } else {
                let results = grailSmartMergeWithoutBuffer(arr, pos + restToProcess, leftOverLen, leftOverFrag, blockLen);
                leftOverLen = results.getLeftOverLen();
                leftOverFrag = results.getLeftOverFrag();
            }
        }
    }
    restToProcess = processIndex - leftOverLen;

    if(lastLen !== 0) {
        if(leftOverFrag !== 0) {
            if(havebuf) {
                grailMultiSwap(arr, pos + restToProcess - blockLen, pos + restToProcess, leftOverLen);
            }
            restToProcess = processIndex;
            leftOverLen = blockLen * aBlockCount;
            leftOverFrag = 0;
        } else {
            leftOverLen += blockLen * aBlockCount;
        }
        if(havebuf) {
            grailMergeLeft(arr, pos + restToProcess, leftOverLen, lastLen, -blockLen);
        }
        else {
            grailMergeWithoutBuffer(arr, pos + restToProcess, leftOverLen, lastLen);
        }
    } else {
        if(havebuf) {
            grailMultiSwap(arr, pos + restToProcess, pos + (restToProcess - blockLen), leftOverLen);
        }
    }
}

// arr[dist..-1] - buffer, arr[0, leftLen - 1] ++ arr[leftLen, leftLen + rightLen - 1]
// -> arr[dist, dist + leftLen + rightLen - 1]
function grailMergeLeft(arr, pos, leftLen, rightLen, dist) {
    let left = 0;
    let right = leftLen;

    rightLen += leftLen;

    while(right < rightLen) {
        if(left === leftLen || compare(arr[pos + left], arr[pos + right]) > 0) {
            grailSwap(arr, pos + (dist++), pos + (right++));
        } 
        else grailSwap(arr, pos + (dist++), pos + (left++));
        pushNewState([pos + left - 1]);
        pushNewState([pos + right - 1]);
    }
    
    if(dist !== left) grailMultiSwap(arr, pos + dist, pos + left, leftLen - left);
}
function grailMergeRight(arr, pos, leftLen, rightLen, dist) {
    let mergedPos = leftLen + rightLen + dist - 1;
    let right = leftLen + rightLen - 1;
    let left = leftLen - 1;

    while(left >= 0) {
        if(right < leftLen || compare(arr[pos + left], arr[pos + right]) > 0) {
            grailSwap(arr, pos + (mergedPos--), pos + (left--));
        } 
        else grailSwap(arr, pos + (mergedPos--), pos + (right--));
        pushNewState([pos + left - 1]);
        pushNewState([pos + right - 1]);
    }
    
    if(right !== mergedPos) {
        while(right >= leftLen) grailSwap(arr, pos + (mergedPos--), pos + (right--));
    }
}

//returns the leftover length, then the leftover fragment
function grailSmartMergeWithoutBuffer(arr, pos, leftOverLen, leftOverFrag, regBlockLen) {
    if(regBlockLen === 0) return new GrailPair(leftOverLen, leftOverFrag);

    let len1 = leftOverLen;
    let len2 = regBlockLen;
    let typeFrag = 1 - leftOverFrag; //1 if inverted

    if(len1 !== 0 && compare(arr[pos + (len1 - 1)], arr[pos + len1]) - typeFrag >= 0) {

        while(len1 !== 0) {
            let foundLen;
            if (typeFrag !== 0) {
                //Binary Search left
                foundLen = grailBinSearch(arr, pos + len1, len2, pos, true);
            } else { 
                //Binary Search right
                foundLen = grailBinSearch(arr, pos + len1, len2, pos, false);
            }
            if(foundLen !== 0) {
                grailRotate(arr, pos, len1, foundLen);
                pos += foundLen;
                len2 -= foundLen;
            }
            if(len2 === 0) {
                return new GrailPair(len1, leftOverFrag);
            }
            do {
                pos++;
                len1--;
            } while(len1 !== 0 && compare(arr[pos], arr[pos + len1]) - typeFrag < 0);
        }
    }
    return new GrailPair(len2, typeFrag);
}

//returns the leftover length, then the leftover fragment
function grailSmartMergeWithBuffer(arr, pos, leftOverLen, leftOverFrag, blockLen) {
    let dist = 0 - blockLen, left = 0, right = leftOverLen, leftEnd = right, rightEnd = right + blockLen;
    let typeFrag = 1 - leftOverFrag;  // 1 if inverted

    while(left < leftEnd && right < rightEnd) {
        if(compare(arr[pos + left], arr[pos + right]) - typeFrag < 0) {
            grailSwap(arr, pos + (dist++), pos + (left++));
        }
        else grailSwap(arr, pos + (dist++), pos + (right++));
        pushNewState([pos + left - 1]);
        pushNewState([pos + right - 1]);
    }
    
    let length, fragment = leftOverFrag;
    if(left < leftEnd) {
        length = leftEnd - left;
        while(left < leftEnd) grailSwap(arr, pos + (--leftEnd), pos + (--rightEnd));
    } else {
        length = rightEnd - right;
        fragment = typeFrag;
    }
    return new GrailPair(length, fragment);
}


/***** Sort With Extra Buffer *****/

//returns the leftover length, then the leftover fragment
function grailSmartMergeWithXBuf(arr, pos, leftOverLen, leftOverFrag, blockLen) {
    let dist = 0 - blockLen, left = 0, right = leftOverLen, leftEnd = right, rightEnd = right + blockLen;
    let typeFrag = 1 - leftOverFrag;  // 1 if inverted
    
    
    while(left < leftEnd && right < rightEnd) {
        if(compare(arr[pos + left], arr[pos + right]) - typeFrag < 0) {
            write(arr, pos + dist++, arr[pos + left++].copy());
        }
        else write(arr, pos + dist++, arr[pos + right++].copy());
        pushNewState([pos + left - 1]);
        pushNewState([pos + right - 1]);
    }
    
    let length, fragment = leftOverFrag;
    if(left < leftEnd) {
        length = leftEnd - left;
        while(left < leftEnd) write(arr, pos + --rightEnd, arr[pos + --leftEnd].copy());
    } else {
        length = rightEnd - right;
        fragment = typeFrag;
    }
    return new GrailPair(length, fragment);
}

// arr[dist..-1] - free, arr[0, leftEnd - 1] ++ arr[leftEnd, leftEnd + rightEnd - 1]
// -> arr[dist, dist + leftEnd + rightEnd - 1]
function grailMergeLeftWithXBuf(arr, pos, leftEnd, rightEnd, dist) {
    let left = 0;
    let right = leftEnd;
    rightEnd += leftEnd;

    
    while(right < rightEnd) {
        if(left === leftEnd || compare(arr[pos + left], arr[pos + right]) > 0) {
            write(arr, pos + dist++, arr[pos + right++].copy());
        }
        else write(arr, pos + dist++, arr[pos + left++].copy());
        pushNewState([pos + left - 1]);
        pushNewState([pos + right - 1]);
    }
    
    if(dist !== left) {
        while(left < leftEnd) write(arr, pos + dist++, arr[pos + left++].copy());
    }
}

// arr - starting array. arr[0 - regBlockLen..-1] - buffer (if havebuf).
// regBlockLen - length of regular blocks. First blockCount blocks are stable sorted by 1st elements and key-coded
// keysPos - where keys are in array, in same order as blocks. keysPos < midkey means stream A
// aBlockCount are regular blocks from stream A.
// lastLen is length of last (irregular) block from stream B, that should go before aCountBlock blocks.
// lastLen = 0 requires aBlockCount = 0 (no irregular blocks). lastLen > 0, aBlockCount = 0 is possible.
function grailMergeBuffersLeftWithXBuf(arr, keysPos, midkey, pos,
       blockCount, regBlockLen, aBlockCount, lastLen) {

    
    if(blockCount === 0) {
        let aBlocksLen = aBlockCount * regBlockLen;
        grailMergeLeftWithXBuf(arr, pos, aBlocksLen, lastLen, 0 - regBlockLen);
        return;
    }

    let leftOverLen = regBlockLen;
    let leftOverFrag = compare(arr[keysPos], arr[midkey]) < 0 ? 0 : 1;
    let processIndex = regBlockLen;

    let restToProcess;
    for(let keyIndex = 1; keyIndex < blockCount; keyIndex++, processIndex += regBlockLen) {
        restToProcess = processIndex - leftOverLen;
        let nextFrag = compare(arr[keysPos + keyIndex], arr[midkey]) < 0 ? 0 : 1;

        if(nextFrag === leftOverFrag) {
            arraycopy(arr, pos + restToProcess, arr, pos + restToProcess - regBlockLen, leftOverLen);
            
            restToProcess = processIndex;
            leftOverLen = regBlockLen;
        } else {
            let results = grailSmartMergeWithXBuf(arr, pos + restToProcess, leftOverLen, leftOverFrag, regBlockLen);
            leftOverLen = results.getLeftOverLen(); 
            leftOverFrag = results.getLeftOverFrag();
        }
    }
    restToProcess = processIndex - leftOverLen;

    if(lastLen !== 0) {
        if(leftOverFrag !== 0) {
            arraycopy(arr, pos + restToProcess, arr, pos + restToProcess - regBlockLen, leftOverLen);
            
            restToProcess = processIndex;
            leftOverLen = regBlockLen * aBlockCount;
            leftOverFrag = 0;
        } else {
            leftOverLen += regBlockLen * aBlockCount;
        }
        grailMergeLeftWithXBuf(arr, pos + restToProcess, leftOverLen, lastLen, 0 - regBlockLen);
    } else {
        arraycopy(arr, pos + restToProcess, arr, pos + restToProcess - regBlockLen, leftOverLen);
    }
}

/***** End Sort With Extra Buffer *****/

// build blocks of length buildLen
// input: [-buildLen, -1] elements are buffer
// output: first buildLen elements are buffer, blocks 2 * buildLen and last subblock sorted
function grailBuildBlocks(arr, pos, len, buildLen, 
        extbuf, bufferPos, extBufLen) {

    let buildBuf = buildLen < extBufLen ? buildLen : extBufLen;
    while((buildBuf & (buildBuf - 1)) !== 0) buildBuf &= buildBuf - 1;  // max power or 2 - just in case

    let extraDist, part;
    if(buildBuf !== 0) {
        arraycopy(arr, pos - buildBuf, extbuf, bufferPos, buildBuf);
        
        for(let dist = 1; dist < len; dist += 2) {
            extraDist = 0;
            if(compare(arr[pos + (dist - 1)], arr[pos + dist]) > 0) extraDist = 1;
            write(arr, pos + dist - 3, arr[pos + dist - 1 + extraDist].copy());
            write(arr, pos + dist - 2, arr[pos + dist - extraDist].copy());
        }
        if(len % 2 !== 0) write(arr, pos + len - 3, arr[pos + len - 1].copy());
        pos -= 2;

        for(part = 2; part < buildBuf; part *= 2) {
            let left = 0;
            let right = len - 2 * part;
            while(left <= right) {
                grailMergeLeftWithXBuf(arr, pos + left, part, part, 0 - part);
                left += 2 * part;
            }
            let rest = len - left;

            if(rest > part) {
                grailMergeLeftWithXBuf(arr, pos + left, part, rest - part, 0 - part);
            } else {
                for(; left < len; left++) write(arr, pos + left - part, arr[pos + left].copy());
            }
            pos -= part;
        }    
        arraycopy(extbuf, bufferPos, arr, pos + len, buildBuf);
    } 
    else {
        for(let dist = 1; dist < len; dist += 2) {
            extraDist = 0;
            if(compare(arr[pos + (dist - 1)], arr[pos + dist]) > 0) extraDist = 1;
            grailSwap(arr, pos + (dist - 3), pos + (dist - 1 + extraDist));
            grailSwap(arr, pos + (dist - 2), pos + (dist - extraDist));
        }
        if(len % 2 !== 0) grailSwap(arr, pos + (len - 1), pos + (len - 3));
        pos -= 2;
        part = 2;
    }

    for(; part < buildLen; part *= 2) {
        let left = 0;
        let right = len - 2 * part;
        while(left <= right) {
            grailMergeLeft(arr, pos + left, part, part, 0 - part);
            left += 2 * part;
        }
        let rest = len - left;
        if(rest > part) {
            grailMergeLeft(arr, pos + left, part, rest - part, 0 - part);
        } else {
            grailRotate(arr, pos + left - part, part, rest);
        }
        pos -= part;
    }
    let restToBuild = len % (2 * buildLen);
    let leftOverPos = len - restToBuild;

    if(restToBuild <= buildLen) grailRotate(arr, pos + leftOverPos, restToBuild, buildLen);
    else grailMergeRight(arr, pos + leftOverPos, buildLen, restToBuild - buildLen, buildLen);

    while(leftOverPos > 0) {
        leftOverPos -= 2 * buildLen;
        grailMergeRight(arr, pos + leftOverPos, buildLen, buildLen, buildLen);
    }
}

// keys are on the left of arr. Blocks of length buildLen combined. We'll combine them in pairs
// buildLen and nkeys are powers of 2. (2 * buildLen / regBlockLen) keys are guaranteed
function grailCombineBlocks(arr, keyPos, pos, len, buildLen,
       regBlockLen, havebuf, buffer, bufferPos) {
    
    let combineLen = Math.floor(len / (2 * buildLen));
    let leftOver = len % (2 * buildLen);
    if(leftOver <= buildLen) {
        len -= leftOver;
        leftOver = 0;
    }

    if(buffer !== null) arraycopy(arr, pos - regBlockLen, buffer, bufferPos, regBlockLen);

    for(let i = 0; i <= combineLen; i++) {
        if(i === combineLen && leftOver === 0) break;

        let blockPos = pos + i * 2 * buildLen;
        let blockCount = Math.floor((i === combineLen ? leftOver : 2 * buildLen) / regBlockLen);

        grailInsertSort(arr, keyPos, blockCount + (i === combineLen ? 1 : 0));
        
        let midkey = Math.floor(buildLen / regBlockLen);

        for(let index = 1; index < blockCount; index++) {
            let leftIndex = index - 1;

            for(let rightIndex = index; rightIndex < blockCount; rightIndex++) {
                let rightComp = compare(arr[blockPos + leftIndex * regBlockLen],
                                              arr[blockPos + rightIndex * regBlockLen]);
                if(rightComp > 0 || (rightComp === 0 && compare(arr[keyPos + leftIndex], arr[keyPos + rightIndex]) > 0)) {
                    leftIndex = rightIndex;
                }
            }
            if(leftIndex !== index - 1) {
                grailMultiSwap(arr, blockPos + (index - 1) * regBlockLen, blockPos + leftIndex * regBlockLen, regBlockLen);
                grailSwap(arr, keyPos + (index - 1), keyPos + leftIndex);
                if(midkey === index - 1 || midkey === leftIndex) {
                    midkey ^= (index - 1) ^ leftIndex;
                }
            }
        }

        let aBlockCount = 0;
        let lastLen = 0;
        if(i === combineLen) lastLen = leftOver % regBlockLen;

        if(lastLen !== 0) {
            while(aBlockCount < blockCount && compare(arr[blockPos + blockCount * regBlockLen],
                    arr[blockPos + (blockCount - aBlockCount - 1) * regBlockLen]) < 0) {
                aBlockCount++;
            }
        }

        if(buffer !== null) {
            grailMergeBuffersLeftWithXBuf(arr, keyPos, keyPos + midkey, blockPos,
                    blockCount - aBlockCount, regBlockLen, aBlockCount, lastLen);
        }
        else grailMergeBuffersLeft(arr, keyPos, keyPos + midkey, blockPos, 
                blockCount - aBlockCount, regBlockLen, havebuf, aBlockCount, lastLen);
    }
    if(buffer !== null) {
        for(let i = len; --i >= 0;) write(arr, pos + i, arr[pos + i - regBlockLen].copy());
        arraycopy(buffer, bufferPos, arr, pos - regBlockLen, regBlockLen);
    }
    else if(havebuf) {
        while(--len >= 0) {
            grailSwap(arr, pos + len, pos + len - regBlockLen);
        }
    }
}

function grailLazyStableSort(arr, pos, len) {
    for(let dist = 1; dist < len; dist += 2) {
        if(compare(arr[pos + dist - 1], arr[pos + dist]) > 0) {
            grailSwap(arr, pos + (dist - 1), pos + dist);
        }
        pushNewState([pos + dist - 1, pos + dist]);
    }

    for(let part = 2; part < len; part *= 2) {
        let left = 0;
        let right = len - 2 * part;

        while(left <= right) {
            grailMergeWithoutBuffer(arr, pos + left, part, part);
            left += 2 * part;
        }

        let rest = len - left;
        if(rest > part) {
            grailMergeWithoutBuffer(arr, pos + left, part, rest - part);
        }
    }
}

function grailCommonSort(arr, pos, len, buffer, bufferPos, bufferLen) {
    grailInsertSorter = new SmartGnomeSort();
    
    if(len <= 16) {
        grailInsertSort(arr, pos, len);
        return;
    }
    
    let blockLen = 1;
    while(blockLen * blockLen < len) blockLen *= 2;
    
    let numKeys = Math.floor((len - 1) / blockLen + 1);
    let keysFound = grailFindKeys(arr, pos, len, numKeys + blockLen);
    
    let bufferEnabled = true;

    if(keysFound < numKeys + blockLen) {
        if(keysFound < 4) {
            grailLazyStableSort(arr, pos, len);
            return;
        }
        numKeys = blockLen;
        while(numKeys > keysFound) numKeys = Math.floor(numKeys / 2);
        bufferEnabled = false;
        blockLen = 0;
    }

    let dist = blockLen + numKeys;
    let buildLen = bufferEnabled ? blockLen : numKeys;

    if(bufferEnabled) {
        grailBuildBlocks(arr, pos + dist, len - dist, buildLen, buffer, bufferPos, bufferLen);
    }
    else {
        grailBuildBlocks(arr, pos + dist, len - dist, buildLen, null, bufferPos, 0);
    }

    // 2 * buildLen are built
    while(len - dist > (buildLen *= 2)) {
        let regBlockLen = blockLen;
        let buildBufEnabled = bufferEnabled;

        if(!bufferEnabled) {
            if(numKeys > 4 && Math.floor(numKeys / 8) * numKeys >= buildLen) {
                regBlockLen = Math.floor(numKeys / 2);
                buildBufEnabled = true;
            } else {
                let calcKeys = 1;
                let i = buildLen * Math.floor(keysFound / 2);
                while(calcKeys < numKeys && i !== 0) {
                    calcKeys *= 2;
                    i = Math.floor(i / 8);
                }
                regBlockLen = Math.floor((2 * buildLen) / calcKeys);
            }
        }
        grailCombineBlocks(arr, pos, pos + dist, len - dist, buildLen, regBlockLen, buildBufEnabled, 
            regBlockLen <= bufferLen ? buffer : null && buildBufEnabled, bufferPos);
        
    }

    grailInsertSort(arr, pos, dist);
    grailMergeWithoutBuffer(arr, pos, dist, len - dist);    
}
/*
function grailInPlaceMerge(arr, pos, len1, len2) {
    if(len1 < 3 || len2 < 3) {
        grailMergeWithoutBuffer(arr, pos, len1, len2);
        return;
    }

    let midpoint;
    if(len1 < len2) midpoint = len1 + len2 / 2;
    else midpoint = len1 / 2;

    //Left binary search
    let len1Left, len1Right;
    len1Left = len1Right = grailBinSearch(arr, pos, len1, pos + midpoint, true);

    //Right binary search
    if(len1Right < len1 && compare(arr[pos + len1Right], arr[pos + midpoint]) === 0) {
        len1Right = grailBinSearch(arr, pos + len1Left, len1 - len1Left, pos + midpoint, false) + len1Left;
    }

    let len2Left, len2Right;
    len2Left = len2Right = grailBinSearch(arr, pos + len1, len2, pos + midpoint, true);

    if(len2Right < len2 && compare(arr[pos + len1 + len2Right], arr[pos + midpoint]) === 0) {
        len2Right = grailBinSearch(arr, pos + len1 + len2Left, len2 - len2Left, pos + midpoint, false) + len2Left;
    }

    if(len1Left === len1Right) grailRotate(arr, pos + len1Right, len1 - len1Right, len2Right);
    else {
        grailRotate(arr, pos + len1Left, len1 - len1Left, len2Left);

        if(len2Right !== len2Left) {
            grailRotate(arr, pos + (len1Right + len2Left), len1 - len1Right, len2Right - len2Left);
        }
    }

    grailInPlaceMerge(arr, pos + (len1Right + len2Right), len1 - len1Right, len2 - len2Right);
    grailInPlaceMerge(arr, pos, len1Left, len2Left);
}
function grailInPlaceMergeSort(arr, start, len) {
    for(let dist = start + 1; dist < len; dist += 2) {
        if(compare(arr[dist - 1], arr[dist]) > 0) grailSwap(arr, dist - 1, dist);
    }
    for(let part = 2; part < len; part *= 2) {
        let left = start, right = len - 2 * part;

        while(left <= right) {
            grailInPlaceMerge(arr, left, part, part);
            left += 2 * part;
        }

        let rest = len - left;
        if(rest > part) grailInPlaceMerge(arr, left, part, rest - part);
    }
}
*/
export function chooseBuffer(choice) {
    bufferType = choice;
}

export function grailSort() {
  if(bufferType === 0) {
    grailCommonSort(elements, 0, count, null, 0, 0);
    pushLastState();
  } else if(bufferType === 1) {
    let ExtBuf = new Array(getStaticBuffer());
    grailCommonSort(elements, 0, count, ExtBuf, 0, getStaticBuffer());
    pushLastState();
  } else if(bufferType === 2) {
    let tempLen = 1;
    while(tempLen * tempLen < count) tempLen *= 2;
    let DynExtBuf = new Array(tempLen);
    grailCommonSort(elements, 0, count, DynExtBuf, 0, tempLen);
    pushLastState();
  } else {
    try {
      throw new Error("Invalid Grail buffer!!");
    } catch (e) {
      console.log(e);
    }
  }
}